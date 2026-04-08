const express = require("express");
const router = express.Router();

const users = require("../controllers/Users");

const validateAuth = require("../middleware/validateAuth");

// PROTECTED ROUTES
router.get("/", validateAuth.validateToken, users.getAll);
router.get("/:id", validateAuth.validateToken, users.getById);
router.put("/:id", validateAuth.validateToken, users.update);
router.delete("/:id", validateAuth.validateToken, users.delete);

module.exports = router;