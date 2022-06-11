const SecurityPatches = require("../models/securityPatchesModel");
const handlerFactory = require("./handlerFactory");

exports.createSecurityPatches =
  handlerFactory.createNewHostSubModel(SecurityPatches);

exports.getHostSecurityPatches =
  handlerFactory.getNewHostSubModel(SecurityPatches);

exports.deleteHostSecurityPatches = handlerFactory.deleteHost(SecurityPatches);
