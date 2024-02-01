const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const mentorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your Name"],
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
      enum: ["mentor"],
      default: "mentor",
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
    timestamps: true,
  }
);

mentorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
mentorSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
mentorSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
// userSchema.index({ phone: 1 }, { unique: true });
const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;
