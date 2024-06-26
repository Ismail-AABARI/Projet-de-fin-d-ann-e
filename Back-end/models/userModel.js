const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Static signup method
userSchema.statics.signup = async function(name, email, username, password) {
  // Validation
  if (!name || !email || !username || !password) {
    throw new Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email is not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, username, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function(email, password) {
  // Validation
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email is not valid');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Invalid email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Invalid password');
  }

  return user;
};

// Check if model is already compiled
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
