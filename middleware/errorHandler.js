const handleErrors = (err, req, res, next) => {
  let errors = {};

  if (err.name === "ValidationError") {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "user with this email already exist";
  }

  return res.status(400).json({ error: err.name, details: errors });
};

module.exports = handleErrors;
