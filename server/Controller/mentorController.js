const Mentor = require("../Model/mentorModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
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
exports.createMentor = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin")) {
    return next(new AppError("Unauthorized", 401));
  }
  const { name, email, password, photo, passwordConfirm, role, phone } =
    req.body;
  const newMentor = await Mentor.create({
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
  if (newMentor) {
    createSendToken(newMentor, 201, res, "Sign up successfully");
  }
});
