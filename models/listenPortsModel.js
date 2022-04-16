const mongoose = require("mongoose");

const ListenPortsScehma = new mongoose.Schema({
  address: { type: String, required: [true, "Please Provide an address"] },
  path: String,
  pid: { type: String, required: [true, "Please Provide a pid"] },
  port: { type: String, required: [true, "Please Provide a port"] },
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

ListenPortsScehma.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const ListenPorts = mongoose.model("Listen-Ports", ListenPortsScehma);

module.exports = ListenPorts;
