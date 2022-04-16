const mongoose = require("mongoose");

const LocalUsersSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please Provide a description"],
  },
  gid: { type: String, required: [true, "Please Provide a gid"] },
  uid: { type: String, required: [true, "Please Provide a uid"] },
  username: { type: String, required: [true, "Please Provide a username"] },
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

LocalUsersSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const LocalUsers = mongoose.model("Local-Users", LocalUsersSchema);

module.exports = LocalUsers;
