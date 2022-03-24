const Host = require("../models/hostModel");
const catchAsyn = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");
const factory = require("./handlerFactory");

exports.createHosts = factory.createOne(Host);
exports.updateHost = factory.updateOne(Host);
exports.deleteHost = factory.deleteOne(Host);
exports.getHost = factory.getOne(Host);
exports.getHosts = factory.getAll(Host);
