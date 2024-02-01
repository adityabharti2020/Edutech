const express = require("express");
const authController = require("../Controller/authController");
const courseController = require("../Controller/courseController");
const mentorController = require("../Controller/mentorController");
const adminController = require("../Controller/adminController");
const router = express.Router();

router.post(
  "/createAdmin",
  authController.protect,
  adminController.createAdmin
);
router.post(
  "/addQuestions",
  authController.protect,
  adminController.addQuestions
);
router.get(
  "/getAllQuestions",
  authController.protect,
  adminController.getAllQuestions
);
router.patch(
  "/updateQuestions/:id",
  authController.protect,
  adminController.updateQuestions
);
router.delete(
  "/deleteQuestions/:id",
  authController.protect,
  adminController.deleteQuestions
);
router.get(
  "/question/:id",
  authController.protect,
  adminController.getQuestion
);
router.get("/adminAuth", authController.auth);

router.post("/createMentor", mentorController.createMentor);
router.get("/getMe", authController.protect, authController.getMe);
module.exports = router;
