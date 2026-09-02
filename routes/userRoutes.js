const express = require("express");
const router = express.Router();
const { getUsers, getUserById, createUser, deleteUser, updateUser } = require("../controllers/userControllers");    

// GET all users
router.get("/", getUsers);

// GET user by ID
router.get("/:id", getUserById);

// CREATE user
router.post("/", createUser);

// UPDATE user
router.put("/:id", updateUser);

// DELETE user
router.delete("/:id", deleteUser);

module.exports = router;