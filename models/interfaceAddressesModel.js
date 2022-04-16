const mongoose = require("mongoose");

const InterfaceAddressesSchema = new mongoose.Schema({
  address: { type: String, required: [true, "Please Provide an address"] },
  interface: { type: String, required: [true, "Please Provide a interface"] },
  mask: { type: String, required: [true, "Please Provide a mask"] },
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

InterfaceAddressesSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const InterfaceAddresses = mongoose.model(
  "Interface-Addresses",
  InterfaceAddressesSchema
);

module.exports = InterfaceAddresses;
