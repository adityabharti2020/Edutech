const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      // required: [true, "Please tell us your Name"],
    },
    lname: {
      type: String,
      // required: [true, "Please tell us your Name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: String, //when we use country code otherwise will take Number
      required: [true, "Please provide your contact number"],
      unique: true,
    },
    photo: String,
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
      validate: function (el) {
        return el === this.password;
      },
      message: "password are not same",
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: {
      default: true,
      select: false,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
// userSchema.index({ phone: 1 }, { unique: true });
const User = mongoose.model("User", userSchema);
module.exports = User;
