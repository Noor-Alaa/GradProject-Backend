const System = require("../models/systemModel");
const handlerFactory = require("./handlerFactory");

exports.createSystem = handlerFactory.createNewHostSubModel(System);

exports.getHostSystem = handlerFactory.getNewHostSubModel(System);

exports.getSystems = handlerFactory.getAll(System);

exports.deleteHostSystem = handlerFactory.deleteHost(System);
