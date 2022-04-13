const mongoose = require("mongoose");
const catchAsync = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");
const Processes = require("../models/processesModel");

exports.createProcesses = catchAsync(async (req, res, next) => {
  let hostIds;
  if (req.body.hosts.length > 0) {
    hostIds = req.body.hosts.map(el => mongoose.Types.ObjectId(el));
    const result = await Processes.deleteMany({ hostid: { $in: hostIds } });
    console.log(result);
  }

  console.log(hostIds);

  const newProcesses = await Processes.create(req.body.data);
  res.status(200).json({
    status: "Success",
    newProcesses,
  });
});

exports.getHostProcesses = catchAsync(async (req, res, next) => {
  const hostProcesses = await Processes.find({
    hostid: mongoose.Types.ObjectId(req.params.hostId),
  });

  if (hostProcesses.length === 0) {
    return next(new AppError("There is no such host", 404));
  }

  res.status(200).json({
    status: "Success",
    hostProcesses,
  });
});
