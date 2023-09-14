const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: {
        name: user.email,
      },
      token: token,
    });
  } catch (err) {
    throw err;
  }
};

const login = async (req, res) => {
  // const { name, email, passowrd } = req.body;
  res.json("hello");
};

module.exports = { register, login };
