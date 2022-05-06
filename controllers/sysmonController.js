const Sysmon = require("../models/sysmonModel");
const handlerFactory = require("./handlerFactory");

exports.createSysmon = handlerFactory.createNewHostSubModel(Sysmon);

exports.getHostSysmon = handlerFactory.getNewHostSubModel(Sysmon);
