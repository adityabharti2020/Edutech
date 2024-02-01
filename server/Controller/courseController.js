const Course = require("../Model/courseModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// cloudinay configuration
cloudinary.config({
  cloud_name: "drtfas2th",
  api_key: "368667837118778",
  api_secret: "KeBt50axbXmhVGl8t_tR7iIuTo0",
  secure: true,
});
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.createCourse = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin")) {
    return next(new AppError("Unauthorized", 401));
  }
  const {
    courseName,
    courseSubtitle,
    image,
    mentor,
    courseDescription,
    courseLink,
    coursePrice,
    rating,
    intrestedStudents,
  } = req.body;

  if (!req.files || !req.files.image) {
    return next(new AppError("Please upload an image file", 400));
  }

  const file = req.files.image;
  const result = await cloudinary.uploader.upload(file.tempFilePath);

  const newCourse = await Course.create({
    courseName,
    courseSubtitle,
    image: { public_id: result.public_id, url: result.url },
    mentor,
    courseDescription,
    courseLink,
    coursePrice,
    rating,
    intrestedStudents,
  });
  if (!courseName || !courseSubtitle || !coursePrice) {
    return res.status(400).json({
      status: "failed",
      message: "please fill the all fields",
    });
  }
  res.status(201).json({
    status: "success",
    data: {
      course: newCourse,
    },
  });
});
exports.getAllCourse = catchAsync(async (req, res, next) => {
  const Features = new APIFeatures(Course.find(), req.query)
    .filter()
    .sort()
    .limitingField()
    .paginate();
  const course = await Features.query;
  res.status(200).json({
    status: "success",
    length: course.length,
    data: course,
  });
});

exports.getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  // console.log(course);
  res.status(200).json({
    status: "success",
    data: { course },
  });
});
exports.updateCourse = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin")) {
    return next(new AppError("Unauthorized", 401));
  }
  // const Id = await Course.findById(req.params.id);
  // console.log("======================>",Id)
  const filterFields = filterObj(
    req.body,
    "courseName",
    "courseSubtitle",
    "mentor",
    "courseDescription",
    "courseLink",
    "coursePrice",
    "rating",
    "intrestedStudents"
  );
  if (req.files && req.files.image) {
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      // public_id: result.public_id,
      overwrite: true, // This ensures that the existing image is overwritten
    });
    // Include image details in the filterFields
    filterFields.image = { public_id: result.public_id, url: result.url };
  }

  // const updateDetails = await Admin.findByIdAndUpdate(
  //   req.user.id,
  //   filterFields, // Include image details in the fields to be updated
  //   { runValidators: true, new: true }
  // );

  const course = await Course.findByIdAndUpdate(req.params.id, filterFields, {
    new: true,
    runValidators: true,
  });
  // Include image details in the filterFields
console.log(course)
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { course },
  });
});
exports.deleteCourse = catchAsync(async (req, res, next) => {
  if (!(req.user.role === "admin")) {
    return next(new AppError("Unauthorized", 401));
  }
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { course },
  });
});
