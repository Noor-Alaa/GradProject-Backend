const User = require("../models/userModel");
const catchAsync = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");
const factory = require("./handlerFactory");

const filterObj = (obj, ...allowedElements) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedElements.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //Check if the user entered a password or password confirm if so give error
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "Can not change password using this route, use /updateMyPassword route"
      )
    );
  }

  // Filter the object
  const filteredBody = filterObj(req.body, "name", "email", "photo");

  //Update the user data using the filtered body object
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  //check for user
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined please use /signup",
  });
};

exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.getAllUsers = factory.getAll(User);
exports.getMe = factory.getOne(User);
