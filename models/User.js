const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
      maxlenght: 50,
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

// environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_LIFETIME = process.env.JWT_LIFETIME;

userSchema.methods.createJWT = function (id) {
  jwt.sign({ id: this._id, name: this.name }, JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  });
};

module.exports = mongoose.model("User", userSchema);
