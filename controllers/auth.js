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
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      success: true,
      data: {
        name: user.email,
      },
      token: token,
    });
  } catch (err) {
    res.status(400).json({ success: false, errors: err.message });
  }
};

module.exports = { register, login };
