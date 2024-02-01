const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Questions = require("../Model/questionsModel");

exports.submitQuestion = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "user")) {
    return next(new AppError("Unauthorized", 401));
  }
  const userResponses = req.body.answer;
  if (!userResponses) {
    return next(
      new AppError(
        "You did'nt Submit any Question! Please Attempt the Question Paper",
        401
      )
    );
  }
  const correctAnswer = userResponses.filter(
    (answer) => answer.isCorrect === true
  );
  const inCorrectAnswer = userResponses.filter(
    (answer) => answer.isCorrect === false
  );
  const result = correctAnswer.length * 4;
  console.log("correctAnswer", correctAnswer);
  console.log("InCorrectAnswer", inCorrectAnswer);

  res.status(200).json({
    status: "success",
    message: "you are authorized",
    data: {
      User: req.user.name,
      Email: req.user.email,
      "Total Questions": userResponses.length,
      "Total Mark": userResponses.length * 4,
      "Obtained Mark": result,
    },
  });
});
