const AppError = require("../helpers/appError");

const handleCastErrorDB = err => {
  const message = `Invaild ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldErrorDB = err => {
  const message = `Duplicated field value:" ${err.keyValue.name} " .Please use a different value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const message = err.message;
  return new AppError(message, 400);
};

const handleJWTError = err => {
  const message = "Invalid token, Please Login again ";
  return new AppError(message, 401);
};

const handleJWTExpiredError = err => {
  const message = "Your token is expired! Please login again.";
  return new AppError(message, 401);
};

const sendDevErr = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  res.status(err.statusCode).render("error.pug", {
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendProdErr = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOpertaional) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      //log the error to
      console.error(err);
      // send generic error
      res.status(err.statusCode).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  } else {
    res.status(err.statusCode).render("error.pug", {
      status: err.status,
      message: "Something went wrong please try again later!!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevErr(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = JSON.parse(JSON.stringify(err));

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    if (error.name === "JsonWebTokenError") error = handleJWTError(error);
    if (error.name === "TokenExpiredError")
      error = handleJWTExpiredError(error);

    sendProdErr(error, req, res);
  }
};
