const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, "Please provide a Course Name"],
      unique: true,
    },
    courseSubtitle: {
      type: String,
      required: [true, "Please provide a subtitle"],
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    mentor: {
      type: String,
    },
    courseDescription: {
      type: String,
    },
    courseLink: {
      type: String,
    },
    coursePrice: {
      type: Number,
      required: [true, "please provide a course price"],
    },
    rating: {
      type: Number,
    },
    intrestedStudents: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
