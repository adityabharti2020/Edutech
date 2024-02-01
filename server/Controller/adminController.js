const Admin = require("../Model/adminModel");
const Question = require("../Model/questionsModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const APIFeatures = require("../utils/apiFeatures");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // 60 min,60sec,1000 milisec
    ),
    // secure: true, Cookie will only send to the encrepted connection this will use in production.
    httpOnly: true, // we set this so that cookie can not be accessed or modified in anyway by the browser
  };
  if ((process.env.NODE_ENV = "production")) cookieOption.secure = true;
  if ((process.env.NODE_ENV = "devlopment")) cookieOption.secure = true;
  res.cookie("jwtedutech", token, cookieOption);
  user.password = undefined;
  res.status(statusCode).json({
    status: message,
    token,
    data: {
      user,
    },
  });
};
exports.createAdmin = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin")) {
    return next(new AppError("Unauthorized", 401));
  }
  const { name, email, password, photo, passwordConfirm, role, phone } =
    req.body;
  const newAdmin = await Admin.create({
    name,
    email,
    password,
    photo,
    role,
    phone,
    passwordConfirm,
  });
  if (!name || !email || !password || !phone || !passwordConfirm) {
    return res.status(400).json({
      status: "failed",
      message: "please fill the all fields",
    });
  }
  if (newAdmin) {
    createSendToken(newAdmin, 201, res, "Sign up successfully");
  }
});
exports.addQuestions = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin")) {
    return next(new AppError("Unauthorized", 401));
  }
  const { question, options } = req.body;
  // const newQuestion = {
  //   question,
  //   options,
  // };
  const questions = await Question.create({ question, options });
  res.status(200).json({
    status: "success",
    message: "Questions Added successfully",
    data: questions,
  });
});
exports.getAllQuestions = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin" || req.user.role === "user")) {
    return next(new AppError("Unauthorized", 401));
  }
  const questions = await Question.find();
  res.status(200).json({
    status: "success",
    length: questions.length,
    data: questions,
  });
});
exports.updateQuestions = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin")) {
    return next(new AppError("Unauthorized", 401));
  }
  let { question, options } = req.body;
  const existingQuestion = await Question.findById(req.params.id);
  if (!existingQuestion) {
    return next(new AppError('Question not found', 404));
  }
  // Check if the question or options have been modified
  // if (
  //   existingQuestion.question === req.body.question ||
  //   Object.keys(options).length === 0
  // ) {
  //   return next(new AppError("You didn't do any changes or Provide data", 400));
  // }
   if (
    existingQuestion.question === question ||
    JSON.stringify(existingQuestion.options) === JSON.stringify(options)
  ) {
    return next(new AppError('No changes or data provided', 400));
  }
    // Update only the necessary fields
    existingQuestion.question = question;
    existingQuestion.options = options;
  
    const updatedQuestion = await existingQuestion.save();
  // const updatedQuestions = await Question.findByIdAndUpdate(
  //   req.params.id,
  //   req.body,
  //   { new: true, runValidators: true }
  // );

  if (!updatedQuestion) {
    res.status(404).json({ status: "fialed", error: "Question not found" });
  }
  // console.log(updatedQuestions);
  res.status(200).json({
    status: "success",
    message: "Questions updated successfully",
    data: updatedQuestion,
  });
});
exports.deleteQuestions = catchAsync(async (req, res, next) => {
  const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Questions deleted successfully",
  });
});
exports.getQuestion = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin" || req.user.role === "user")) {
    return next(new AppError("Unauthorized", 401));
  }
  const currentQuestion = await Question.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: currentQuestion,
  });
});
