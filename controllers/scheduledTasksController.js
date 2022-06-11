const ScheduledTasks = require("../models/scheduledTasksModel");
const handlerFactory = require("./handlerFactory");

exports.createScheduledTasks =
  handlerFactory.createNewHostSubModel(ScheduledTasks);

exports.getHostScheduledTasks =
  handlerFactory.getNewHostSubModel(ScheduledTasks);

exports.deleteHostScheduledTasks = handlerFactory.deleteHost(ScheduledTasks);
