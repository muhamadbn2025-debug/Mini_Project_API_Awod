const express = require("express");
const router = express.Router();

const productController = require("../controllers/products");
const { validateProducts } = require("../middleware/validateProducts");
const validateAuth = require("../middleware/validateAuth");

// semua route wajib login
router.use(validateAuth.validateToken);

// GET
router.get("/", productController.getAll);
router.get("/with-category", productController.getWithCategory);
router.get("/count-per-category", productController.countPerCategory); 
router.get("/:id", productController.getById);

// CREATE & UPDATE pakai validasi
router.post("/", validateProducts, productController.store);
router.put("/:id", validateProducts, productController.update);

// DELETE
router.delete("/:id", productController.destroy);

module.exports = router;








