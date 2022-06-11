const System = require("../models/systemModel");
const handlerFactory = require("./handlerFactory");

exports.createSystem = handlerFactory.createNewHostSubModel(System);

exports.getHostSystem = handlerFactory.getNewHostSubModel(System);

exports.deleteHostSystem = handlerFactory.deleteHost(System);
