const express = require("express");
const router = express.Router();

const productController = require("../controllers/products");

// GET ALL
router.get("/", productController.getAll);

// JOIN (HARUS DI ATAS)
router.get("/with-category", productController.getWithCategory);

// GET BY ID
router.get("/:id", productController.getById);

// CREATE
router.post("/", productController.create);

// UPDATE
router.put("/:id", productController.update);

// DELETE
router.delete("/:id", productController.delete);

module.exports = router;