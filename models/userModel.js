const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: [3, "Name must be at least 3 letters"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "Provide different email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [8, "Password must be more than 6"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide a password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password confirm should match the password ",
    },
  },
  passwordChangedAt: Date,
  resetToken: String,
  resetTokenExpireDate: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  loggedPassword,
  hashPassword
) {
  // console.log(
  //   loggedPassword,
  //   hashPassword,
  //   await bcrypt.compare(loggedPassword, hashPassword)
  // );
  return await bcrypt.compare(loggedPassword, hashPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangedAt = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < passwordChangedAt;
  }

  return false;
};

userSchema.methods.createResetToken = function () {
  const token = crypto.randomBytes(32).toString("hex");

  this.resetToken = crypto
    .createHmac("sha256", "abcdefg")
    .update(token)
    .digest("hex");

  this.resetTokenExpireDate = Date.now() + 10 * 60 * 1000;

  console.log(token, this.resetToken);

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
