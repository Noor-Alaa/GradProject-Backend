const Host = require("../models/hostModel");
const catchAsync = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");
const factory = require("./handlerFactory");

exports.createHosts = factory.createOne(Host);
exports.updateHost = factory.updateOne(Host);
exports.deleteHost = factory.deleteOne(Host);
exports.getHost = factory.getOne(Host);
// exports.getHosts = factory.getAll(Host);

exports.getStatus = catchAsync(async (req, res, next) => {
  const onlineHosts = await Host.aggregate([
    {
      $match: {
        updatedAt: { $gte: new Date(new Date() - 3 * 60000) },
      },
    },
    {
      // prettier-ignore
      $set: { "status": "online" },
    },
  ]);

  const offlineHosts = await Host.aggregate([
    {
      $match: {
        updatedAt: { $lt: new Date(new Date() - 3 * 60000) },
      },
    },
    {
      // prettier-ignore
      $set: { "status": "offline" },
    },
  ]);

  res.status(200).json({ hostsStatus: [...onlineHosts, ...offlineHosts] });
});
