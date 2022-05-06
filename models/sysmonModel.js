const mongoose = require("mongoose");

const SysmonSchema = new mongoose.Schema({
  RuleName: {
    type: String,
    required: [true, "Please Provide a RuleName"],
  },
  UtcTime: { type: String, required: [true, "Please Provide a UtcTime"] },
  ProcessGuid: {
    type: String,
    required: [true, "Please Provide a ProcessGuid"],
  },
  ProcessId: { type: String, required: [true, "Please Provide a ProcessId"] },
  Image: { type: String, required: [true, "Please Provide a Image"] },
  FileVersion: {
    type: String,
    required: [true, "Please Provide a FileVersion"],
  },
  Description: {
    type: String,
    required: [true, "Please Provide a Description"],
  },
  Product: { type: String, required: [true, "Please Provide a Product"] },
  Company: { type: String, required: [true, "Please Provide a Company"] },
  OriginalFileName: {
    type: String,
    required: [true, "Please Provide a OriginalFileName"],
  },
  CommandLine: {
    type: String,
    required: [true, "Please Provide a CommandLine"],
  },
  CurrentDirectory: {
    type: String,
    required: [true, "Please Provide a CurrentDirectory"],
  },
  User: { type: String, required: [true, "Please Provide a User"] },
  LogonGuid: { type: String, required: [true, "Please Provide a LogonGuid"] },
  LogonId: { type: String, required: [true, "Please Provide a LogonId"] },
  TerminalSessionId: {
    type: String,
    required: [true, "Please Provide a TerminalSessionId"],
  },
  IntegrityLevel: {
    type: String,
    required: [true, "Please Provide a IntegrityLevel"],
  },
  Hashes: { type: String, required: [true, "Please Provide a Hashes"] },
  ParentProcessGuid: {
    type: String,
    required: [true, "Please Provide a ParentProcessGuid"],
  },
  ParentProcessId: {
    type: String,
    required: [true, "Please Provide a ParentProcessId"],
  },
  ParentImage: {
    type: String,
    required: [true, "Please Provide a ParentImage"],
  },
  ParentCommandLine: {
    type: String,
    required: [true, "Please Provide a ParentCommandLine"],
  },
  ParentUser: { type: String, required: [true, "Please Provide a ParentUser"] },
  id: { type: String, required: [true, "Please Provide a id"] },
  hostid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Host",
    required: [true, "A processes must belong to a host"],
  },
  expireAt: {
    type: Date,
    default: new Date(Date.now() + 3600 * 1000 * 24),
  },
});

SysmonSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Sysmon = mongoose.model("Sysmon", SysmonSchema);

module.exports = Sysmon;
