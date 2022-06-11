const UsersGroups = require("../models/usersGroupsModel");
const handlerFactory = require("./handlerFactory");

exports.createUsersGroups = handlerFactory.createNewHostSubModel(UsersGroups);

exports.getHostUsersGroups = handlerFactory.getNewHostSubModel(UsersGroups);

exports.deleteHostUsersGroups = handlerFactory.deleteHost(UsersGroups);
