const express = require("express");
const router = express.Router();

const departemen = require("../controllers/departemen");

// GET ALL
router.get("/", departemen.getAll);

// GET BY ID
router.get("/:id", departemen.getById);

// CREATE
router.post("/", departemen.create);

// UPDATE
router.put("/:id", departemen.update);

// DELETE
router.delete("/:id", departemen.delete);


module.exports = router;