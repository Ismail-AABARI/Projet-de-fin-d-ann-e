const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserVerification = require('../models/userVerification');
const PasswordReset = require('../models/passwordReset');
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const bcrypt = require('bcrypt');
const path = require("path");
const jwt = require('jsonwebtoken');
const e = require('express');
const Userschema = require('../models/userModel');


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for messages");
        console.log(success);
    }
});


const sendVerificationEmail = async ({ _id, email }) => {
    try {
        const currentUrl = "http://localhost:3000/";
        const uniqueString = uuidv4() + _id;
        const saltRounds = 10;

        const hashUniqueString = await bcrypt.hash(uniqueString, saltRounds);

        const expiresAt = Date.now() + 21600000; // Expiration dans 6 heures (21600000 ms)

        const newVerification = new UserVerification({
            userId: _id,
            uniqueString: hashUniqueString,
            createdAt: Date.now(),
            expiresAt: expiresAt, // Utiliser la valeur calculée pour expiresAt
        });

        await newVerification.save();

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify your email",
            html: `<p>Verify your email address to complete the signup and login into your account.</p>
            <p>This link <b>expires in 6 hours</b>.</p>
            <p>Press <a href=${currentUrl + "user/verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`
        };

        await transporter.sendMail(mailOptions);

        return { status: "PENDING", message: "Verification email sent" };
    } catch (error) {
        console.log(error);
        return { status: "FAILED", message: "An error occurred while sending verification email" };
    }
};




router.get("/verify/:userId/:uniqueString", async (req, res) => {
    const { userId, uniqueString } = req.params;

    try {
        const result = await UserVerification.find({ userId });

        if (result.length > 0) {
            const { expiresAt, uniqueString: hashedUniqueString } = result[0];
            if (expiresAt < Date.now()) {
                await UserVerification.deleteOne({ userId });
                await User.deleteOne({ _id: userId });
                return res.status(404).sendFile(path.join(__dirname, "../views/error.html"));
            } else {
                const isValid = await bcrypt.compare(uniqueString, hashedUniqueString);
                if (isValid) {
                    await User.updateOne({ _id: userId }, { verified: true });
                    await UserVerification.deleteOne({ userId });
                    return res.status(200).sendFile(path.join(__dirname, "../views/verified.html"));
                } else {
                    return res.status(400).sendFile(path.join(__dirname, "../views/error.html"));
                }
            }
        } else {
            return res.status(404).sendFile(path.join(__dirname, "../views/error.html"));
        }
    } catch (error) {
        console.log(error);
        return res.status(500).sendFile(path.join(__dirname, "../views/error.html"));
    }
});

router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/verified.html"));
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send({ error: 'User already exists' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({ email, password: hashedPassword, verified: false });
        await newUser.save();

        await sendVerificationEmail(newUser, res);

        return res.status(200).send({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(400).send({ error: 'Registration failed', message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const data = req.body;

    try {
        const user = await User.findOne({ email: data.email });

        if (!user) {
            return res.status(400).send('Email or password invalid!');
        }

        const validPass = bcrypt.compareSync(data.password, user.password);

        if (!validPass) {
            return res.status(401).send('Email or password invalid!');
        }

        const payload = {
            _id: user._id,
            email: user.email,
        };

        const token = jwt.sign(payload, user.password);

        res.status(200).send({
            message: 'User logged in successfully',
            mytoken: token,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/getall', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
        console.log("Data collected successfully")
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/byemail/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email });
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const deletedUser = await User.findOneAndDelete({ email });
        res.status(200).send({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(400).send(error);
    }
});




router.post("/requestPasswordReset", (req, res) => {
    const { email, redirectUrl } = req.body;

    User.find({ email })
        .then((data) => {
            if (data.length) {
                //user exists

                // check if user is verified

                if (data[0].verified) {
                    sendResetEmail(data[0], redirectUrl, res);
                } else {
                    return res.status(200).json({ status: "Failed", message: "Email hasn't been verified yet, check your inbox" });
                }
            } else {
                return res.status(200).json({ status: "Failed", message: "An error occurred while checking for existing user" });
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(200).json({ status: "Failed", message: "An error occurred while checking for existing user" });
        });
});


//send password reset email
const sendResetEmail = ({ _id, email }, redirectUrl, res) => {
    const resetString = uuidv4() + _id;

    // First, we clear all existing reset records
    PasswordReset.deleteMany({ userId: _id })
        .then(result => {
            // Reset records deleted successfully
            // Now we send the email
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: "Password Reset",
                html: `<p>We heard that you lost the password.</p>
                <p>Don't worry, use the link below to reset it <b>expires in 60 minutes</b>.</p>
                <p>Press <a href=${redirectUrl + "/" + _id + "/" + resetString}>here</a> to proceed.</p>`
            };

            // hash the reset string
            const saltRounds = 10;
            bcrypt.hash(resetString, saltRounds)
                .then(hashedResetString => {
                    //set values in password reset collection
                    const newPasswordReset = new PasswordReset({
                        userId: _id,
                        resetString: hashedResetString,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 3600000, // Expiration après 1 heure (3600000 ms)
                    });

                    newPasswordReset.save()
                        .then(() => {
                            transporter.sendMail(mailOptions)
                                .then(() => {
                                    // reset email sent and password reset record saved
                                    return res.status(200).json({ status: "PENDING", message: "Password reset email sent" });
                                })
                                .catch(error => {
                                    console.log(error);
                                    return res.status(500).json({ status: "FAILED", message: "Password reset email failed" });
                                });
                        })
                        .catch(error => {
                            console.log(error);
                            return res.status(500).json({ status: "FAILED", message: "An error occurred while saving the password reset data" });
                        });
                })
                .catch(error => {
                    console.log(error);
                    return res.status(500).json({ status: "FAILED", message: "An error occurred while hashing the password reset data" });
                });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).json({ status: "FAILED", message: "An error occurred while sending the password reset email" });
        });
};

//reset the password
router.post("/resetPassword", async (req, res) => {
    let { userId, resetString, newPassword } = req.body;

    try {
        const result = await PasswordReset.find({ userId });

        if (result.length > 0) {
            const { expiresAt, resetString: hashedResetString } = result[0];

            if (expiresAt < Date.now()) {
                await PasswordReset.deleteOne({ userId });
                return res.status(400).json({ status: "FAILED", message: "Password reset link has expired" });
            } else {
                const isValid = await bcrypt.compare(resetString, hashedResetString);
                if (isValid) {
                    const saltRounds = 10;
                    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

                    await User.updateOne({ _id: userId }, { password: hashedNewPassword });
                    await PasswordReset.deleteOne({ userId });

                    return res.status(200).json({ status: "SUCCESS", message: "Password has been reset successfully" });
                } else {
                    return res.status(400).json({ status: "FAILED", message: "Invalid password reset details passed" });
                }
            }
        } else {
            return res.status(404).json({ status: "FAILED", message: "Password reset request not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "FAILED", message: "An error occurred while resetting the password" });
    }
});

const createToken= (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'});
}

//singnup user
// Update the signupUser function to use Userschema
const signupUser = async (req, res) => {
    const { name, email, username, password } = req.body;

    try {
        const user = await Userschema.signup(name, email, username, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//login user
const loginUser = async (req, res) => {
    const {email,password} = req.body;

    try {
        const user = await UserSchema.login(email,password);
        const name = user.name;
        //creating jwt token
        const token = createToken(user._id);
        res.status(200).json({name,email,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//signup user
router.post('/signup',signupUser)

//login user
router.post('/loginn',loginUser)


module.exports = router;
