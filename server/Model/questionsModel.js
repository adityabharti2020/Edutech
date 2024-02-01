const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const question = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "please provide a question"],
      unique: [true, "Dupplicate questions! Please add another question"],
    },
    options: {
      type: [
        {
          optionText: {
            type: String,
            required: [true, "please provide an option"],
          },
          isCorrect: {
            type: Boolean,
            required: [true, "please provide a correct answer"],
          },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// Pre-save middleware
question.pre("save", function (next) {
  if (!this.isModified("options")) {
    console.log("No changes made to the options array");
    return next();
  }

  console.log("Options array is modified:", this.options);

  // Check if any individual option is modified
  this.options.forEach((option, index) => {
    const isOptionModified = this.isModified(`options.${index}`);
    if (isOptionModified) {
      console.log(`Option at index ${index} is modified:`, option);
    }
  });

  // Continue with the save process
  next();
});
const Question = mongoose.model("mcq", question);
module.exports = Question;
