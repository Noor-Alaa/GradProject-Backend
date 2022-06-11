const SystemEvent = require("../models/systemEventModel");
const handlerFactory = require("./handlerFactory");

exports.createSystemEvent = handlerFactory.createNewHostSubModel(SystemEvent);

exports.getHostSystemEvent = handlerFactory.getNewHostSubModel(SystemEvent);

exports.deleteHostSystemEvent = handlerFactory.deleteHost(SystemEvent);
