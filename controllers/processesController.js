const mongoose = require("mongoose");
const catchAsync = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");
const Processes = require("../models/processesModel");

exports.createProcesses = catchAsync(async (req, res, next) => {
  const newProcesses = await Processes.create(req.body);
  res.status(200).json({
    status: "Success",
    newProcesses,
  });
});

exports.getHostProcesses = catchAsync(async (req, res, next) => {
  const hostProcesses = await Processes.find({
    hostId: mongoose.Types.ObjectId(req.params.hostId),
  });

  if (hostProcesses.length === 0) {
    return next(new AppError("There is no such host", 404));
  }

  res.status(200).json({
    status: "Success",
    hostProcesses,
  });
});
