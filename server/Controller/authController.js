const crypto = require("crypto");
const { promisify } = require("util");
const User = require("../Model/usrModel");
const Admin = require("../Model/adminModel");
const Mentor = require("../Model/mentorModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
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
exports.signUp = catchAsync(async (req, res, next) => {
  const { fname, lname, email, password, photo, passwordConfirm, role, phone } =
    req.body;
  const newUser = await User.create({
    fname,
    lname,
    email,
    password,
    photo,
    role,
    phone,
    passwordConfirm,
  });
  if (!fname || !lname || !email || !password || !phone || !passwordConfirm) {
    return res.status(400).json({
      status: "failed",
      message: "please fill the all fields",
    });
  }
  if (newUser) {
    createSendToken(newUser, 201, res, "success");
  }
});
exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log("login data", email, password);
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const user =
    (await User.findOne({ email }).select("+password")) ||
    (await Mentor.findOne({ email }).select("+password")) ||
    (await Admin.findOne({ email }).select("+password"));

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res, "success");
});
exports.logOut = catchAsync(async (req, res, next) => {
  // const user = req.user;
  // const token = req.token;
  res.status(200).clearCookie("jwtedutech").json({ status: "success" });
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // console.log("req.headers.authorization",req.headers)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie) {
    token = req.headers.cookie.replace("jwtedutech=", "");
  }
  // const filteredPayload = req.headers.cookie.replace('jwtedutech=', '');
  console.log("token", token);
  if (!token) {
    return next(
      new AppError("You are not loggedIn! Please login to get access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log("first", decoded);
  const currentUser =
    (await User.findById(decoded.id)) ||
    (await Admin.findById(decoded.id)) ||
    (await Mentor.findById(decoded.id));
  // console.log("current User", currentUser);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  // we can provide to check password reset or changed password code here.
  req.user = currentUser;
  req.token = token;
  next();
});
exports.getAlluser = catchAsync(async (req, res, next) => {
  if (req.user.role === "admin") {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      length: user.length,
      data: user,
    });
  } else {
    next(new AppError("You are not authorized to perform this action", 401));
  }
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user =
    (await User.findByIdAndUpdate(req.user.id, { active: false })) ||
    (await Mentor.findByIdAndUpdate(req.user.id, { active: false }));

  if (!user) {
    return next(new AppError("No User found with that ID", 404));
  }
  res.status(200).json({
    status: "Deactivated successfully",
    data: { user },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This rote is not for password update! Please use updateMyPassword route",
        400
      )
    );
  }
  if (req.body.role) {
    return next(new AppError("This field is not to be updated", 400));
  }

  const filteredBody = filterObj(req.body, "name", "email", "phone");
  const updatedUser =
    (await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    })) ||
    (await Mentor.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    })) ||
    (await Admin.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    }));
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});
exports.getMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    status: "success",
    data: { user },
  });
});
exports.auth = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // console.log("token", token);
  if (!token) {
    return next(
      new AppError("You are not loggedIn! Please login to get access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser =
    (await User.findById(decoded.id)) ||
    (await Admin.findById(decoded.id)) ||
    (await Mentor.findById(decoded.id));
  // console.log("current User", currentUser);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  res.status(200).json({
    status: "success",
    dtat: { currentUser },
  });
  // we can provide to check password reset or changed password code here.
  // req.user = currentUser;
  // next();
});
