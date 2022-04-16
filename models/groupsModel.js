const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema({
  comment: { type: String, required: [true, "Please Provide an comment"] },
  gid: { type: String, required: [true, "Please Provide an gid"] },
  groupname: { type: String, required: [true, "Please Provide a groupname"] },
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

groupsSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Groups = mongoose.model("Groups", groupsSchema);

module.exports = Groups;
