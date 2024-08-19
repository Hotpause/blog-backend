const express = require("express");
const passport = require("passport");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
} = require("../controllers/userController");

const router = express.Router();

// Public routes
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);

// Protected routes
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

module.exports = router;
