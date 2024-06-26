const express = require('express');

const userRoutes = require('./routes/user')

const bodyParser = require('body-parser');

const cors = require('cors');

require('./config/connect');

const app = express();
/* const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}; */

app.use(cors(corsOptions));

// Utilisez le middleware cors
app.use(cors({
    origin: 'http://localhost:5173' 
  }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

app.use('/api/user',userRoutes)

app.listen(3000 , ()=>{
    console.log("server work!")

});