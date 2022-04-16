const mongoose = require("mongoose");

const SecurityPatchesSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Please Provide a caption"],
  },
  csname: { type: String, required: [true, "Please Provide a csname"] },
  description: {
    type: String,
    required: [true, "Please Provide an description"],
  },
  hotfix_id: { type: String, required: [true, "Please Provide a hotfix_id"] },
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

SecurityPatchesSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const SecurityPatches = mongoose.model(
  "Security-Patches",
  SecurityPatchesSchema
);

module.exports = SecurityPatches;
