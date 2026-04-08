const { body } = require("express-validator");

const validateProducts = [
  body("product_name")
    .notEmpty()
    .withMessage("product_name products harus diisi"),
  body("price")
    .notEmpty()
    .withMessage("price products harus diisi")
    .isNumeric().withMessage("price products harus berupa angka"),
  body("stock")
    .notEmpty()
    .withMessage("stock products harus diisi")
    .isNumeric()
    .withMessage("stock products harus berupa angka"),
];

module.exports = { validateProducts };
