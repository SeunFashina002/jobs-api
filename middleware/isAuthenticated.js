const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// environmental variables
const JWT_SECRET = process.env.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, error: "Oops, you need to login" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // attach it to the job request headers
    if (!req.user) {
      req.user = { id: payload.id, name: payload.name };
    }

    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Oops, you need to login" });
  }
};

module.exports = isAuthenticated;
