const ApplicationEvent = require("../models/applicationEventModel");
const handlerFactory = require("./handlerFactory");

exports.createApplicationEvent =
  handlerFactory.createNewHostSubModel(ApplicationEvent);

exports.getHostApplicationEvent =
  handlerFactory.getNewHostSubModel(ApplicationEvent);

exports.deleteHostApplicationEvent =
  handlerFactory.deleteHost(ApplicationEvent);
