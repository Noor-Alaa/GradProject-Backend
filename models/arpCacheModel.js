const mongoose = require("mongoose");

const arpCacheSchema = new mongoose.Schema({
  address: { type: String, required: [true, "Please Provide an address"] },
  interface: { type: String, required: [true, "Please Provide an interface"] },
  mac: { type: String, required: [true, "Please Provide a mac"] },
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

arpCacheSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const ARPcache = mongoose.model("ARP-cache", arpCacheSchema);

module.exports = ARPcache;
