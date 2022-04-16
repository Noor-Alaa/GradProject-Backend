const mongoose = require("mongoose");

const InstalledSoftwareSchema = new mongoose.Schema({
  install_location: {
    type: String,
    required: [true, "Please Provide an install_location"],
  },
  name: { type: String, required: [true, "Please Provide a name"] },
  publisher: { type: String, required: [true, "Please Provide a publisher"] },
  version: { type: String, required: [true, "Please Provide a version"] },
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

InstalledSoftwareSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const InstalledSoftware = mongoose.model(
  "Installed-Software",
  InstalledSoftwareSchema
);

module.exports = InstalledSoftware;
