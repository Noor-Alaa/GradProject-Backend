const mongoose = require("mongoose");
const Sysmon = require("../models/sysmonModel");
const Host = require("../models/hostModel");
const handlerFactory = require("./handlerFactory");
const catchAsync = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");

exports.createSysmon = handlerFactory.createNewHostSubModel(Sysmon);

exports.getHostSysmon = handlerFactory.getNewHostSubModel(Sysmon);

exports.getSysmonAlert = catchAsync(async (req, res, next) => {
  console.log(req.params);
  let data = await Sysmon.find({
    hostid: mongoose.Types.ObjectId(req.params.hostId),
  });

  const user = await Host.find({
    hostid: mongoose.Types.ObjectId(req.params.hostId),
  });

  if (data.length === 0) {
    return next(new AppError("There is no such host", 404));
  }

  let alertData = [];
  let response = {};
  if (req.params.eventId === "T1054") {
    alertData = await Sysmon.find({
      Image: { $regex: "fltmc.exe" },
      CommandLine: { $regex: "unload" },
    });

    if (alertData.length === 0) {
      return next(new AppError("There is no such event", 404));
    }

    response = {
      Tactic: "Defense Evasion",
      Technique: "Impair Defenses",
      AttackID: "T1054",
      Description:
        "An adversary may attempt to block indicators or events typically captured by sensors from being gathered and analyzed.",
      AlertTime: new Date().toLocaleString("en"),
      HostName: user[0].hostName,
      User: alertData[0].User,
    };
  }

  if (req.params.eventId === "T1057") {
    alertData = await Sysmon.find({
      Image: { $regex: "tasklist.exe" },
      CommandLine: { $regex: "Get-Process" },
    });

    if (alertData.length === 0) {
      return next(new AppError("There is no such event", 404));
    }

    response = {
      Tactic: "Discovery, Execution",
      Technique: "Process Discovery",
      AttackID: "T1057",
      Description:
        "Adversaries may attempt to get information about running processes on a system.",
      AlertTime: new Date().toLocaleString("en"),
      HostName: user[0].hostName,
      User: alertData[0].User,
    };
  }

  if (req.params.eventId === "T1553") {
    alertData = await Sysmon.find({
      Image: { $regex: "certutil.exe" },
      CommandLine: { $regex: "-addstore" },
    });

    if (alertData.length === 0) {
      return next(new AppError("There is no such event", 404));
    }

    response = {
      Tactic: "Defense Evasion",
      Technique: "Subvert Trust Controls",
      AttackID: "T1553",
      Description:
        "Adversaries may undermine security controls that will either warn users of untrusted activity or prevent execution of untrusted programs.",
      AlertTime: new Date().toLocaleString("en"),
      HostName: user[0].hostName,
      User: alertData[0].User,
    };
  }

  if (req.params.eventId === "T1218") {
    alertData = await Sysmon.find({
      Image: { $regex: "regsvr32.exe" },
      CommandLine: { $regex: "scrobj.dll" },
    });

    if (alertData.length === 0) {
      return next(new AppError("There is no such event", 404));
    }

    response = {
      Tactic: "Defense Evasion",
      Technique: "System Binary Proxy Execution",
      AttackID: "T1218",
      Description:
        "Adversaries may bypass process and/or signature-based defenses by proxying execution of malicious content with signed, or otherwise trusted, binaries.",
      AlertTime: new Date().toLocaleString("en"),
      HostName: user[0].hostName,
      User: alertData[0].User,
    };
  }

  if (req.params.eventId === "T1564") {
    alertData = await Sysmon.find({
      Image: {
        $regex: /powershell.exe|rundll32.exe|wmic.exe|wscript.exe|cscript.exe/,
      },
      CommandLine: { $regex: "some_regex" },
    });

    if (alertData.length === 0) {
      return next(new AppError("There is no such event", 404));
    }

    response = {
      Tactic: "Defense Evasion",
      Technique: "Hide Artifacts",
      AttackID: "T1564",
      Description:
        "Adversaries may attempt to hide artifacts associated with their behaviors to evade detection.",
      AlertTime: new Date().toLocaleString("en"),
      HostName: user[0].hostName,
      User: alertData[0].User,
    };
  }

  if (req.params.eventId === "T1548") {
    alertData = await Sysmon.find({
      Image: { $regex: "cmd.exe" },
      CommandLine: { $regex: "echo", $regex: "pipe" },
    });

    if (alertData.length === 0) {
      return next(new AppError("There is no such event", 404));
    }

    response = {
      Tactic: "Privilege Escalation, Defense Evasion",
      Technique: "Abuse Elevation Control Mechanism",
      AttackID: "T1548",
      Description:
        "Adversaries may circumvent mechanisms designed to control elevate privileges to gain higher-level permissions.",
      AlertTime: new Date().toLocaleString("en"),
      HostName: user[0].hostName,
      User: alertData[0].User,
    };
  }

  if (alertData.length === 0) {
    return next(new AppError("There is no such event", 404));
  }

  console.log(user[0]);
  res.status(200).json({
    status: "Success",
    data: {
      response,
    },
  });
});
