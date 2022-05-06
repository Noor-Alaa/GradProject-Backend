const mongoose = require("mongoose");

const SystemSchema = new mongoose.Schema({
  machineName: {
    type: String,
    required: [true, "Please Provide a machineName"],
  },
  logName: { type: String, required: [true, "Please Provide a logName"] },
  TimeCreated: { type: Date, required: [true, "Please Provide a TimeCreated"] },
  processId: { type: String, required: [true, "Please Provide a processId"] },
  level: { type: String, required: [true, "Please Provide a level"] },
  message: { type: String, required: [true, "Please Provide a message"] },
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

SystemSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const System = mongoose.model("System", SystemSchema);

module.exports = System;
