const Groups = require("../models/groupsModel");
const handlerFactory = require("./handlerFactory");

exports.createGroups = handlerFactory.createNewHostSubModel(Groups);

exports.getHostGroups = handlerFactory.getNewHostSubModel(Groups);

exports.deleteHostGroups = handlerFactory.deleteHost(Groups);
