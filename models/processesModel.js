const mongoose = require("mongoose");

const processesSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please Provide a name"] },
  path: { type: String, required: [true, "Please Provide a path"] },
  parent: { type: Number, required: [true, "Please Provide a parent"] },
  pid: { type: Number, required: [true, "Please Provide a pid"] },
  uid: { type: Number, required: [true, "Please Provide a uid"] },
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

processesSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Processes = mongoose.model("Processes", processesSchema);

module.exports = Processes;
