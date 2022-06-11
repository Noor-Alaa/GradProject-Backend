const mongoose = require("mongoose");
const APIFeatures = require("./../helpers/apiFeatures");
const catchAsync = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      next(new AppError("There is no such document", 404));
      return;
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    // console.log(req.files);
    // console.log(req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      next(new AppError("There is no such document", 404));
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, path) =>
  catchAsync(async (req, res, next) => {
    let userId = req.params.id || req.user.id;
    let query = Model.findById(userId);
    if (path)
      query = query.populate({
        path: path,
      });
    const doc = await query;

    if (!doc) {
      return next(new AppError("There is no such document", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.createNewHostSubModel = Model =>
  catchAsync(async (req, res, next) => {
    let hostIds;
    if (req.body.hosts.length > 0) {
      hostIds = req.body.hosts.map(el => mongoose.Types.ObjectId(el));
      const result = await Model.deleteMany({ hostid: { $in: hostIds } });
      console.log(result);
    }

    console.log(hostIds);

    const data = await Model.create(req.body.data);
    res.status(200).json({
      status: "Success",
      data,
    });
  });

// exports.getNewHostSubModel = Model =>
//   catchAsync(async (req, res, next) => {
//     const data = await Model.find({
//       hostid: mongoose.Types.ObjectId(req.params.hostId),
//     });

//     if (data.length === 0) {
//       return next(new AppError("There is no such host", 404));
//     }

//     res.status(200).json({
//       status: "Success",
//       data,
//     });
//   });

exports.getNewHostSubModel = Model =>
  catchAsync(async (req, res, next) => {
    // EXECUTE QUERY
    const features = new APIFeatures(
      Model.find({ hostid: mongoose.Types.ObjectId(req.params.hostId) }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const data = await features.query;

    if (data.length === 0) {
      return next(new AppError("There is no such host", 404));
    }

    res.status(200).json({
      status: "Success",
      results: data.length,
      data,
    });
  });

exports.deleteHost = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.deleteMany({
      hostid: mongoose.Types.ObjectId(req.params.hostId),
    });

    if (!doc) {
      next(new AppError("There is no such document", 404));
      return;
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
