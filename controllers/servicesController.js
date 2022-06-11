const mongoose = require("mongoose");
const catchAsync = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");
const Services = require("../models/servicesModel");
const handlerFactory = require("./handlerFactory");

exports.createServices = handlerFactory.createNewHostSubModel(Services);

exports.getHostServices = handlerFactory.getNewHostSubModel(Services);

exports.deleteHostServices = handlerFactory.deleteHost(Services);
