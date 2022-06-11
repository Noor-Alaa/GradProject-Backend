const Security = require("../models/securityModel");
const handlerFactory = require("./handlerFactory");

exports.createSecurity = handlerFactory.createNewHostSubModel(Security);

exports.getHostSecurity = handlerFactory.getNewHostSubModel(Security);

exports.deleteHostSecurity = handlerFactory.deleteHost(Security);
