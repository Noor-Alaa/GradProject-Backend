const Route = require("../models/routeModel");
const handlerFactory = require("./handlerFactory");

exports.createRoute = handlerFactory.createNewHostSubModel(Route);

exports.getHostRoute = handlerFactory.getNewHostSubModel(Route);
