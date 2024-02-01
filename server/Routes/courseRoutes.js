const express = require("express");
const authController = require("../Controller/authController");
const courseController = require("../Controller/courseController");
const router = express.Router();
router.post(
  "/createCourse",
  authController.protect,
  courseController.createCourse
);
router.get(
  "/getAllCourse",
  authController.protect,
  courseController.getAllCourse
);
router.get(
  "/getCourse/:id",
  authController.protect,
  courseController.getCourse
);
router.patch(
  "/updateCourse/:id",
  authController.protect,
  courseController.updateCourse
);
router.delete(
  "/deleteCourse/:id",
  authController.protect,
  courseController.deleteCourse
);
router.delete(
  "/deleteUser/:id",
  authController.protect,
  authController.deleteUser
);
module.exports = router;
