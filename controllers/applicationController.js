const Application = require("../models/applicationModel");
const handlerFactory = require("./handlerFactory");

exports.createApplication = handlerFactory.createNewHostSubModel(Application);

exports.getHostApplication = handlerFactory.getNewHostSubModel(Application);

exports.getApplication = handlerFactory.getAll(Application);

exports.deleteHostApplcation = handlerFactory.deleteHost(Application);
