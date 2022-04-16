const LocalUsers = require("../models/localUsers");
const handlerFactory = require("./handlerFactory");

exports.createLocalUsers = handlerFactory.createNewHostSubModel(LocalUsers);

exports.getHostLocalUsers = handlerFactory.getNewHostSubModel(LocalUsers);
