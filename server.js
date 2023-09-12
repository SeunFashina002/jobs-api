require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");

// additional security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

// environment variables
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

//TODO: middlewares

//TODO: routes

const start = async () => {
  try {
    await connectDB(MONGODB_URL);
    app.listen(PORT, (req, res) => {
      console.log(`server is listening at port ${PORT}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
