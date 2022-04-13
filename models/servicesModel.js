const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please Provide a name"] },
  pid: { type: String, required: [true, "Please Provide a pid"] },
  status: { type: String, required: [true, "Please Provide a status"] },
  user_account: {
    type: String,
    required: [true, "Please Provide a user_account"],
  },
  description: {
    type: String,
    required: [true, "Please Provide a description"],
  },
  display_name: {
    type: String,
    required: [true, "Please Provide a display_name"],
  },
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

servicesSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Services = mongoose.model("Services", servicesSchema);

module.exports = Services;
