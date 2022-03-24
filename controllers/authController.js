const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../helpers/catchingAsyncErr");
const AppError = require("../helpers/appError");
const sendEmail = require("../helpers/email");

const tokenSign = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = tokenSign(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_COOKIE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //to send or recieve the token only
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true; //to use https

  res.cookie("jwt", token, cookieOptions);

  //remove password from output but has nothing to do with the document in database
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide a valid email and password"), 404);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password"), 401);
  }

  createSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true, //to send or recieve the token only
  };

  res.cookie("jwt", "LoggedOut", cookieOptions);

  res.status(200).json({
    status: "success",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //get the token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Please login to gain access", 401));
  }

  //token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //make sure the user isn't deleted
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("User doesn't exist anymore", 401));
  }

  //Password isn't changed
  const passwordChanged = currentUser.changedPasswordAfter(decoded.iat);
  if (passwordChanged) {
    return next(
      new AppError("User recently changed password! Please login again", 401)
    );
  }

  res.locals.user = currentUser;
  req.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      //token verification
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      //make sure the user isn't deleted
      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next();
      }

      //Password isn't changed
      const passwordChanged = currentUser.changedPasswordAfter(decoded.iat);
      if (passwordChanged) {
        return next();
      }

      res.locals.user = currentUser;
      return next();
    }
    next();
  } catch (err) {
    next();
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You don't have permission to do such action"));
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //find if there is user with the provided mail
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user with such email", 404));
  }

  //create a reset token
  const token = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  //send the reset token to the user email
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${token}`;

  const message = `Visit the following url \n ${resetUrl} \n to reset your password the token will be available for 10 minutes only`;
  try {
    await sendEmail({
      message,
      subject: "Reset password",
      email: user.email,
    });

    res.status(201).json({
      status: "success",
      message: "Reset token were sent to your email",
    });
  } catch (err) {
    console.log(err);
    user.resetToken = undefined;
    user.resetTokenExpireDate = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was a problem sending the email, please try again later",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //search for the user by the token and make sure that the token isn't expired
  let resetToken = req.params.token;

  resetToken = crypto
    .createHmac("sha256", "abcdefg")
    .update(resetToken)
    .digest("hex");

  console.log(resetToken);
  const user = await User.findOne({
    resetToken,
    resetTokenExpireDate: { $gte: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired token", 404));
  }

  console.log(user);
  //change the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetToken = undefined;
  user.resetTokenExpireDate = undefined;
  await user.save();

  //passwordChangedAt value set  using pre save document middleware
  //send JWT
  createSendToken(user, 201, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //Get user from collection
  const user = await User.findById(req.user._id).select("+password");

  //Check if the user exist and the current password match the password in database

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Incorrect password", 401));
  }

  //change the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //Login the user (Create and send JWT)
  createSendToken(user, 201, res);
});
