const ListenPorts = require("../models/listenPortsModel");
const handlerFactory = require("./handlerFactory");

exports.createListenPorts = handlerFactory.createNewHostSubModel(ListenPorts);

exports.getHostListenPorts = handlerFactory.getNewHostSubModel(ListenPorts);
