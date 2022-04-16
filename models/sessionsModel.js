const mongoose = require("mongoose");

const SessionsSchema = new mongoose.Schema({
  pid: {
    type: String,
    required: [true, "Please Provide a pid"],
  },
  registry_hive: {
    type: String,
    required: [true, "Please Provide a registry_hive"],
  },
  time: {
    type: String,
    required: [true, "Please Provide a time"],
  },
  type: { type: String, required: [true, "Please Provide a type"] },
  user: { type: String, required: [true, "Please Provide a user"] },

  host: String,
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

SessionsSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Sessions = mongoose.model("Sessions", SessionsSchema);

module.exports = Sessions;
