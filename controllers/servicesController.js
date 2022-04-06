const mongoose = require("mongoose");
const catchAsync = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");
const Services = require("../models/servicesModel");

exports.createServices = catchAsync(async (req, res, next) => {
  let hostIds;
  if (req.body.hosts.length > 0) {
    hostIds = req.body.hosts.map(el => mongoose.Types.ObjectId(el));
    const result = await Services.deleteMany({ hostId: { $in: hostIds } });
    console.log(result);
  }

  console.log(hostIds);

  const newServices = await Services.create(req.body.data);
  res.status(200).json({
    status: "Success",
    newServices,
  });
});

exports.getHostServices = catchAsync(async (req, res, next) => {
  const hostServices = await Services.find({
    hostId: mongoose.Types.ObjectId(req.params.hostId),
  });

  if (hostServices.length === 0) {
    return next(new AppError("There is no such host", 404));
  }

  res.status(200).json({
    status: "Success",
    hostServices,
  });
});
