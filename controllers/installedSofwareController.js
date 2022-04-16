const InstalledSoftware = require("../models/installedSoftwareModel");
const handlerFactory = require("./handlerFactory");

exports.createInstalledSoftware =
  handlerFactory.createNewHostSubModel(InstalledSoftware);

exports.getHostInstalledSoftware =
  handlerFactory.getNewHostSubModel(InstalledSoftware);
