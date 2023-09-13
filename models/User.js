const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minlength: 6,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
