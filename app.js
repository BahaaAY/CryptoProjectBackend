const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

const port = 3000;

//db username and password
const username = require("./util/credentials").username;
const password = require("./util/credentials").password;
//mongodb connection Uri
const MONGODB_URI = `mongodb+srv://${username}:${password}@cluster0.o8mxmhh.mongodb.net/crypto`;

//import routes
const establishmentRoutes = require('./routes/establishment');

app.use((req, res, next) => {
    // Fix CORS error
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
  });
app.use(bodyParser.json());

app.use(establishmentRoutes);

const connectDB = async () => {
    try {
      //if try works
      await mongoose.connect(MONGODB_URI);
      console.log("Mongodb Connected...");
      const server = app.listen(3000);
      console.log("Server is listening on port 3000");

    } catch (err) {
      //if try fails
      err.statusCode = 500;
      console.log(err);
      //exit process with failure
      process.exit(1);
    }
  };
  
  connectDB();