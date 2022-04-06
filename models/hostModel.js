const mongoose = require("mongoose");

const HostSchema = new mongoose.Schema({
  status: String,
  uuid: String,
  memory: String,
  hostName: {
    type: String,
    required: [true, "Please Provide hostName"],
    unique: true,
  },
  uptime: {
    days: String,
    hours: String,
    minutes: String,
  },
  os_info: {
    name: {
      type: String,
      required: [true, "Please Provide name"],
    },
    version: {
      type: String,
      required: [true, "Please Provide version"],
    },
    build: {
      type: String,
      required: [true, "Please Provide build"],
    },
    arch: {
      type: String,
      required: [true, "Please Provide arch"],
    },
  },
  cpu_info: {
    model: {
      type: String,
      required: [true, "Please Provide model"],
    },
    current_clock_speed: {
      type: String,
      required: [true, "Please Provide clockSpeed"],
    },
    number_of_cores: {
      type: String,
      required: [true, "Please Provide cores"],
    },
  },
  windows_security_center: {
    antivirus: {
      type: String,
      required: [true, "Please Provide antivirus"],
    },
    firewall: {
      type: String,
      required: [true, "Please Provide firewall"],
    },
    autoupdate: {
      type: String,
      required: [true, "Please Provide autoupdate"],
    },
    windows_security_center_service: {
      type: String,
      required: [true, "Please Provide wscs"],
    },
    user_account_control: {
      type: String,
      required: [true, "Please Provide uac"],
    },
  },
  disk_info: {
    disk_index: String,
    disk_size: String,
    id: String,
    number_of_partitions: String,
    type: {
      type: String,
    },
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

HostSchema.pre("findOneAndUpdate", async function () {
  updatedDoc = await this.model.findOne(this.getQuery());
  console.log(updatedDoc);
  updatedDoc.updatedAt = new Date();
  await updatedDoc.save();
});

const Host = mongoose.model("Host", HostSchema);

module.exports = Host;
