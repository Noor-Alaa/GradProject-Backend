const mongoose = require("mongoose");

const ScheduledTasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a name"],
  },
  path: { type: String, required: [true, "Please Provide a path"] },
  state: { type: String, required: [true, "Please Provide an state"] },
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

ScheduledTasksSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const ScheduledTasks = mongoose.model("Scheduled-Tasks", ScheduledTasksSchema);

module.exports = ScheduledTasks;
