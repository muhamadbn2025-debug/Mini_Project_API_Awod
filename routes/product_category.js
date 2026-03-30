const express = require("express");
const router = express.Router();

const productCategory = require("../controllers/product_category");

// GET ALL
router.get("/", productCategory.getAll);

// JOIN (HARUS DI ATAS)
// router.get("/with-category", productCategory.getWithCategory);

// GET BY ID
router.get("/:id", productCategory.getById);

// CREATE
router.post("/", productCategory.create);

// UPDATE
router.put("/:id", productCategory.update);

// DELETE
router.delete("/:id", productCategory.delete);

module.exports = router;