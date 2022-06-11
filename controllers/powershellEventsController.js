const PowershellEvents = require("../models/powershellEventsModel");
const handlerFactory = require("./handlerFactory");

exports.createPowershellEvents =
  handlerFactory.createNewHostSubModel(PowershellEvents);

exports.getHostPowershellEvents =
  handlerFactory.getNewHostSubModel(PowershellEvents);

exports.deleteHostPowershellEvents =
  handlerFactory.deleteHost(PowershellEvents);
