const ARPcache = require("../models/arpCacheModel");
const handlerFactory = require("./handlerFactory");

exports.createARPcache = handlerFactory.createNewHostSubModel(ARPcache);

exports.getHostARPcache = handlerFactory.getNewHostSubModel(ARPcache);
