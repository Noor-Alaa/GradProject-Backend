const SecurityEvents = require("../models/securityEventsModel");
const handlerFactory = require("./handlerFactory");

exports.createSecurityEvents =
  handlerFactory.createNewHostSubModel(SecurityEvents);

exports.getHostSecurityEvents =
  handlerFactory.getNewHostSubModel(SecurityEvents);

exports.deleteHostSecurityEvents = handlerFactory.deleteHost(SecurityEvents);
