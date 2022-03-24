const mongoose = require("mongoose");

const DiskInfo = new mongoose.Schema({
  diskNumber: { type: Number, required: [true, "Please Provide diskNumber"] },
  partitions: { type: [String], require: [true, "Please Provide partitions"] },
  totalSpace: { type: String, required: [true, "Please Provide totalSpace"] },
  freeSpace: { type: String, required: [true, "Please Provide freespace"] },
});

const HostSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "Online",
  },
  diskAvailableSpace: {
    type: String,
    required: [true, "Please Provide Disk Available Space"],
  },
  ram: {
    type: String,
    required: [true, "Please Provide RAM"],
  },
  cpu: {
    type: String,
    required: [true, "Please Provide CPU"],
  },
  os: {
    type: String,
    required: [true, "Please Provide RAM"],
  },
  ipAddress: {
    type: String,
    required: [true, "Please Provide RAM"],
  },
  uptime: {
    days: String,
    hours: String,
  },
  details: {
    detailsId: {
      type: String,
      required: [true, "Please Provide detailsId"],
    },
    hostName: {
      type: String,
      required: [true, "Please Provide hostName"],
      unique: true,
    },
    cpuType: {
      type: String,
      required: [true, "Please Provide cpuType"],
    },
    macAddress: {
      type: String,
      required: [true, "Please Provide macAddress"],
    },
  },
  osInfo: {
    name: {
      type: String,
      required: [true, "Please Provide name"],
    },
    version: {
      type: String,
      required: [true, "Please Provide version"],
    },
    patch: {
      type: String,
      required: [true, "Please Provide patch"],
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
  cpuInfo: {
    model: {
      type: String,
      required: [true, "Please Provide model"],
    },
    clockSpeed: {
      type: String,
      required: [true, "Please Provide clockSpeed"],
    },
    cores: {
      type: String,
      required: [true, "Please Provide cores"],
    },
    type: {
      type: String,
      required: [true, "Please Provide type"],
    },
  },
  windowsSecurityCenter: {
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
    wscs: {
      type: String,
      required: [true, "Please Provide wscs"],
    },
    uac: {
      type: String,
      required: [true, "Please Provide uac"],
    },
  },
  diskInfo: [DiskInfo],
});

const Host = mongoose.model("Host", HostSchema);

module.exports = Host;
