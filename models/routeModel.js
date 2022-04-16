const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: [true, "Please Provide a destination"],
  },
  gateway: { type: String, required: [true, "Please Provide a gateway"] },
  interface: { type: String, required: [true, "Please Provide an interface"] },
  netmask: { type: String, required: [true, "Please Provide a netmask"] },
  source: String,
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

RouteSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Route = mongoose.model("Route", RouteSchema);

module.exports = Route;
