require("dotenv").config();
require("express-async-errors");

const express = require("express");
const connectDB = require("./db/connect");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");

// additional security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

// environment variables
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

//TODO: middlewares

// routes
app.use("api/v1/auth", authRoutes);

const start = async () => {
  try {
    await connectDB(MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`server is listening at port ${PORT}...`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

// start();
