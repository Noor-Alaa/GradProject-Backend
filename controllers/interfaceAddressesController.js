const InterfaceAddresses = require("../models/interfaceAddressesModel");
const handlerFactory = require("./handlerFactory");

exports.createInstalledSoftware =
  handlerFactory.createNewHostSubModel(InterfaceAddresses);

exports.getHostInstalledSoftware =
  handlerFactory.getNewHostSubModel(InterfaceAddresses);
