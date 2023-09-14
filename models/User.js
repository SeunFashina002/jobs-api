const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

// environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_LIFETIME = process.env.JWT_LIFETIME;

// create and assign JWT
userSchema.methods.createJWT = function (id) {
  return jwt.sign({ id: this._id, name: this.name }, JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  });
};

// hash password before saving to database
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
