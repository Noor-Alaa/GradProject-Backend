const mongoose = require("mongoose");

const PowershellEventsSchema = new mongoose.Schema({
  LogName: { type: String, required: [true, "Please Provide a LogName"] },
  Id: { type: Number, required: [true, "Please Provide a Id"] },
  ProcessId: { type: Number, required: [true, "Please Provide a ProcessId"] },
  UserId: { BinaryLength: Number, AccountDomainSid: String, Value: String },
  LevelDisplayName: {
    type: String,
    required: [true, "Please Provide a LevelDisplayName"],
  },
  MachineName: {
    type: String,
    required: [true, "Please Provide a MachineName"],
  },
  TimeCreated: {
    type: String,
    required: [true, "Please Provide a TimeCreated"],
  },
  Message: { type: String, required: [true, "Please Provide a Message"] },
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

PowershellEventsSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const PowershellEvents = mongoose.model(
  "Powershell-Events",
  PowershellEventsSchema
);

module.exports = PowershellEvents;
