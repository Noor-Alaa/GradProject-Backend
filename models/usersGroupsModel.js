const mongoose = require("mongoose");

const usersGroupsSchema = new mongoose.Schema({
  gid: { type: String, required: [true, "Please Provide a gid"] },
  uid: { type: String, required: [true, "Please Provide a uid"] },
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

usersGroupsSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const UsersGroups = mongoose.model("Users-Groups", usersGroupsSchema);

module.exports = UsersGroups;
