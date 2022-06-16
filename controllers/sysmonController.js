const Sysmon = require("../models/sysmonModel");
const handlerFactory = require("./handlerFactory");
const catchAsync = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");

exports.createSysmon = handlerFactory.createNewHostSubModel(Sysmon);

exports.getHostSysmon = handlerFactory.getNewHostSubModel(Sysmon);

exports.getAllSysmons = handlerFactory.getAll(Sysmon);

exports.getSysmonAlert = catchAsync(async (req, res, next) => {
  let data = await Sysmon.find();

  if (data.length === 0) {
    return next(new AppError("There is no sysmon logs", 404));
  }

  let alertData = [];

  let responses = [];
  let totalAlerts = [];

  /** T1574 **/
  alertData = await Sysmon.find({
    Image: { $regex: "updater.exe" },
    CommandLine: { $regex: "Command exit" },
  });

  responses = alertData.map(el => ({
    Tactic: "Persistence, Privilege Escalation, Defense Evasion",
    Technique: "Hijack Execution Flow",
    AttackID: "T1574",
    Description:
      "attackers may execute their own malicious payloads by hijacking the way operating systems run programs.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  /** T1197 **/
  alertData = await Sysmon.find({
    Image: { $regex: "bitsadmin.exe" },
    CommandLine: { $regex: "create" },
  });

  responses = alertData.map(el => ({
    Tactic: "Defense Evasion, Persistence",
    Technique: "BITS Jobs",
    AttackID: "T1197",
    Description:
      "Adversaries may abuse BITS jobs to persistently execute or clean up after malicious payloads.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  /** T1070 **/
  alertData = await Sysmon.find({
    Image: { $regex: "wevtutil.exe" },
    CommandLine: { $regex: "wevtutil" },
  });

  responses = alertData.map(el => ({
    Tactic: "	Defense Evasion",
    Technique: "Indicator Removal on Host",
    AttackID: "T1070",
    Description:
      "Adversaries may delete or modify artifacts generated on a host system to remove evidence of their presence or hinder defenses.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  /** T1047 **/
  alertData = await Sysmon.find({
    Image: { $regex: "WMIC.exe" },
    CommandLine: { $regex: "wmic" },
  });

  responses = alertData.map(el => ({
    Tactic: "Execution",
    Technique: "Windows Management Instrumentation",
    AttackID: "T1047",
    Description:
      "Adversaries may use Windows Management Instrumentation (WMI) to move laterally, by launching executables remotely.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  /** T1053 **/
  alertData = await Sysmon.find({
    Image: { $regex: "schtasks.exe" },
    CommandLine: { $regex: "query" },
  });

  responses = alertData.map(el => ({
    Tactic: "Persistence",
    Technique: "Scheduled Task/Job",
    AttackID: "T1053",
    Description:
      "attacker may use Windows Task Scheduler to execute programs at system startup or on a scheduled basis for persistence.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  /** T1136 **/
  alertData = await Sysmon.find({
    Image: { $regex: "net.exe" },
    CommandLine: { $regex: "add" },
  });

  responses = alertData.map(el => ({
    Tactic: "Persistence",
    Technique: "Create Account",
    AttackID: "T1136",
    Description:
      "attacker may create an account to maintain access to victim systems.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  /** T1543 **/
  alertData = await Sysmon.find({
    Image: { $regex: "sc.exe" },
    CommandLine: { $regex: "config" },
  });

  responses = alertData.map(el => ({
    Tactic: "Persistence, Privilege Escalation",
    Technique: "Create or Modify System Process",
    AttackID: "T1543",
    Description:
      "attacker may create or modify system-level processes to repeatedly execute malicious payloads.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  /** T1137 **/
  alertData = await Sysmon.find({
    Image: { $regex: "reg.exe" },
    CommandLine: { $regex: "add" },
  });

  responses = alertData.map(el => ({
    Tactic: "Persistence",
    Technique: "Office Application Startup",
    AttackID: "T1137",
    Description:
      "attacker may leverage Microsoft Office-based applications for persistence between startups.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  /** T1562 **/
  alertData = await Sysmon.find({
    Image: { $regex: "fltmc.exe" },
    CommandLine: { $regex: "unload" },
  });

  responses = alertData.map(el => ({
    Tactic: "Defense Evasion",
    Technique: "Impair Defenses",
    AttackID: "T1562",
    Description:
      "An adversary may attempt to block indicators or events typically captured by sensors from being gathered and analyzed.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  /** T1505 **/
  alertData = await Sysmon.find({
    Image: { $regex: "xcopy.exe" },
    CommandLine: { $regex: "xcopy" },
  });

  responses = alertData.map(el => ({
    Tactic: "Persistent",
    Technique: "Server Software Component",
    AttackID: "T1505",
    Description:
      "attacker may abuse legitimate extensible development features of servers to establish persistent access to systems.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  /** T1003 **/
  alertData = await Sysmon.find({
    Image: { $regex: "mimikatz.exe" },
    CommandLine: { $regex: "mimikatz" },
  });

  responses = alertData.map(el => ({
    Tactic: "Credential Access",
    Technique: "OS Credential Dumping",
    AttackID: "T1003",
    Description:
      "Adversaries may attempt to dump credentials to obtain account login and credential material, normally in the form of a hash or a clear text password, from the operating system and software.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  alertData = await Sysmon.find({
    Image: { $regex: "tasklist.exe" },
    CommandLine: { $regex: "Get-Process" },
  });

  responses = alertData.map(el => ({
    Tactic: "Discovery, Execution",
    Technique: "Process Discovery",
    AttackID: "T1057",
    Description:
      "Adversaries may attempt to get information about running processes on a system.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  alertData = await Sysmon.find({
    Image: { $regex: "certutil.exe" },
    CommandLine: { $regex: "addstore" },
  });

  responses = alertData.map(el => ({
    Tactic: "Defense Evasion",
    Technique: "Subvert Trust Controls",
    AttackID: "T1553",
    Description:
      "Adversaries may undermine security controls that will either warn users of untrusted activity or prevent execution of untrusted programs.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  alertData = await Sysmon.find({
    Image: { $regex: "regsvr32.exe" },
    CommandLine: { $regex: "scrobj.dll" },
  });

  responses = alertData.map(el => ({
    Tactic: "Defense Evasion",
    Technique: "System Binary Proxy Execution",
    AttackID: "T1218",
    Description:
      "Adversaries may bypass process and/or signature-based defenses by proxying execution of malicious content with signed, or otherwise trusted, binaries.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  alertData = await Sysmon.find({
    Image: {
      $regex: /powershell.exe|rundll32.exe|wmic.exe|wscript.exe|cscript.exe/,
    },
    CommandLine: { $regex: "some_regex" },
  });

  responses = alertData.map(el => ({
    Tactic: "Defense Evasion",
    Technique: "Hide Artifacts",
    AttackID: "T1564",
    Description:
      "Adversaries may attempt to hide artifacts associated with their behaviors to evade detection.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  alertData = await Sysmon.find({
    Image: { $regex: "cmd.exe" },
    CommandLine: { $regex: "echo", $regex: "pipe" },
  });

  responses = alertData.map(el => ({
    Tactic: "Privilege Escalation, Defense Evasion",
    Technique: "Abuse Elevation Control Mechanism",
    AttackID: "T1548",
    Description:
      "Adversaries may circumvent mechanisms designed to control elevate privileges to gain higher-level permissions.",
    AlertTime: new Date(el.UtcTime).toLocaleString("en"),
    HostName: el.User.split("/")[0],
    User: el.User,
  }));

  if (alertData.length > 0) {
    totalAlerts = [...totalAlerts, ...responses];
  }

  if (totalAlerts.length === 0) {
    return next(new AppError("There is no attacks", 404));
  }

  console.log(responses);
  res.status(200).json({
    status: "Success",
    data: {
      totalAlerts,
    },
  });
});
