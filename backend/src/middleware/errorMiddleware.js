const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.message === "Email already registered") {
    return res.status(409).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message === "Invalid email or password") {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message === "User already has an active membership") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message === "Membership plan not found") {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message === "Membership plan is not active") {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
