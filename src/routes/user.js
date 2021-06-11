const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.js");

const authMiddleware = require("../../middleware/auth");

//GET
router.get("/", UserController.getUsers);
router.get(
  "/:id",
  authMiddleware(["ADMIN", "CLIENT"]),
  UserController.getUsersById
);

//POST
router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

//PUT
router.put("/:id", UserController.updateUserById);

//DELETE
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
