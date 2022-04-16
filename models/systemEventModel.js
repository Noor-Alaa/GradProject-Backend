const mongoose = require("mongoose");

const SystemEventSchema = new mongoose.Schema({
  channel: { type: String, required: [true, "Please Provide a channel"] },
  data: { type: String, required: [true, "Please Provide a data"] },
  datetime: { type: Date, required: [true, "Please Provide a datetime"] },
  eventid: { type: String, required: [true, "Please Provide a eventid"] },
  level: { type: String, required: [true, "Please Provide a level"] },
  pid: { type: String, required: [true, "Please Provide a pid"] },
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

SystemEventSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const SystemEvent = mongoose.model("System-Event", SystemEventSchema);

module.exports = SystemEvent;
