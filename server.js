require("dotenv").config();
require("express-async-errors");

const express = require("express");

// additional security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

// environment variables
const PORT = process.env.PORT;

const app = express();

//TODO: middlewares

//TODO: routes

//TODO: initiate mongodb
app.listen(PORT, (req, res) => {
  console.log(`server is listening at port ${PORT}...`);
});
