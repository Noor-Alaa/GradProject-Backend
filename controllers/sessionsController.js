const Sessions = require("../models/sessionsModel");
const handlerFactory = require("./handlerFactory");

exports.createSessions = handlerFactory.createNewHostSubModel(Sessions);

exports.getHostSessions = handlerFactory.getNewHostSubModel(Sessions);
