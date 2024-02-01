const express = require("express");
const authController = require("../Controller/authController");
const courseController = require("../Controller/courseController");
const userController = require("../Controller/userController");
const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/logIn", authController.logIn);
router.get("/logOut", authController.logOut);
router.get("/getAllUsers", authController.protect, authController.getAlluser);
router.delete(
  "/deleteUsers/:id",
  authController.protect,
  authController.deleteUser
);
router.patch("/updateMe/:id", authController.protect, authController.updateMe);
router.post(
  "/submitQuestion",
  authController.protect,
  userController.submitQuestion
);

module.exports = router;
