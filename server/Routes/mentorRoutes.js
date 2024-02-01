const express = require("express");
const authController = require("../Controller/authController");
const courseController = require("../Controller/courseController");
const mentorController = require("../Controller/mentorController");
const router = express.Router();

router.post("/createMentor",mentorController.createMentor)
module.exports = router;
