 const { body } = require("express-validator");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

// REGISTER VALIDATION
const validateRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required").normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// LOGIN VALIDATION
const validateLogin = [
  body("email").isEmail().withMessage("Email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

// TOKEN VALIDATION
const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Token not found", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 403));
  }
};

// UPDATE PASSWORD VALIDATION
const validateUpdatePassword = [
  body("email").isEmail().withMessage("Email is required").normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateToken,
  validateUpdatePassword,
};