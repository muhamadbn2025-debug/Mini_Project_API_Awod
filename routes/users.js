const express = require("express");
const router = express.Router();

const users = require("../controllers/Users");

// GET ALL
router.get("/", users.getAll);

// GET BY ID
router.get("/:id", users.getById);

// CREATE
router.post("/", users.create);

// UPDATE
router.put("/:id", users.update);

// DELETE
router.delete("/:id", users.delete);


module.exports = router;