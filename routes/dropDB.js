const express = require("express");
const catchingAsyncErr = require("../helpers/catchingAsyncErr");
const router = express.Router();

const Application = require("../models/applicationModel");
const applicationEventModel = require("../models/applicationEventModel");
const arpCacheModel = require("../models/arpCacheModel");
const groupsModel = require("../models/groupsModel");
const hostModel = require("../models/hostModel");
const installedSoftwareModel = require("../models/installedSoftwareModel");
const interfaceAddressesModel = require("../models/interfaceAddressesModel");
const listenPortsModel = require("../models/listenPortsModel");
const localUsers = require("../models/localUsers");
const powershellEventsModel = require("../models/powershellEventsModel");
const processesModel = require("../models/processesModel");
const routeModel = require("../models/routeModel");
const scheduledTasksModel = require("../models/scheduledTasksModel");
const securityEventsModel = require("../models/securityEventsModel");
const securityModel = require("../models/securityModel");
const securityPatchesModel = require("../models/securityPatchesModel");
const sessionsModel = require("../models/sessionsModel");
const servicesModel = require("../models/servicesModel");
const systemEventModel = require("../models/systemEventModel");
const sysmonModel = require("../models/sysmonModel");
const systemModel = require("../models/systemModel");
const usersGroupsModel = require("../models/usersGroupsModel");

router.delete(
  "/",
  catchingAsyncErr(async (req, res, next) => {
    [
      Application,
      applicationEventModel,
      arpCacheModel,
      groupsModel,
      hostModel,
      installedSoftwareModel,
      interfaceAddressesModel,
      listenPortsModel,
      localUsers,
      powershellEventsModel,
      processesModel,
      routeModel,
      scheduledTasksModel,
      securityEventsModel,
      securityPatchesModel,
      sessionsModel,
      servicesModel,
      systemEventModel,
      sysmonModel,
      systemModel,
      usersGroupsModel,
      securityModel,
    ].forEach(async el => await el.remove({}));

    res.status(204).json({
      status: "success",
      data: null,
    });
  })
);

module.exports = router;
