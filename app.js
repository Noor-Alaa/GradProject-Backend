const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
var xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const GlobalErrorHandler = require("./helpers/errorHandler");
const AppError = require("./helpers/appError");
// const tourRouter = require('./routes/tourRoutes');
const userRouter = require("./routes/userRoutes");
const hostRouter = require("./routes/hostRoutes");
const processesRouter = require("./routes/processesRoutes");
const servicesRouter = require("./routes/servicesRoutes");
const arpCacheRouter = require("./routes/arpCacheRoutes");
const groupsRouter = require("./routes/groupsRoutes");
const InstalledSoftwareRouter = require("./routes/installedSoftwareRoutes");
const InterfaceAddressesRouter = require("./routes/InterfaceAddressesRoutes");
const ListenPortsRouter = require("./routes/listenPortsRoutes");
const LocalUsersRouter = require("./routes/localUsersRoutes");
const RouteRouter = require("./routes/routeRoutes");
const ScheduledTasksRouter = require("./routes/scheduledTasksRoutes");
const SecurityPatchesRouter = require("./routes/securityPatchesRoutes");
const SessionsRouter = require("./routes/sessionsRoutes");
const UsersGroupsRouter = require("./routes/usersGroupsRoutes");
const ApplicationEventRouter = require("./routes/applicationEventRoutes");
const SystemEventRouter = require("./routes/systemEventRoutes");
const SecurityEventsRouter = require("./routes/securityEventsRoutes");
const PowershellEventsRouter = require("./routes/powershellEventsRoutes");
// const reviewRouter = require('./routes/reviewRoutes');
// const viewRouter = require('./routes/viewRoutes');

const app = express();

//Global Middlewares

//Serving static files using express static engine
app.use(express.static(`${__dirname}/public`));

// Setting security http headers using helmet
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// "guide@text.com"
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again after an hour",
});

//setting http requests limit using express rate limit
app.use("/api", limiter);

//Parse body ,reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: false }));
//Parse cookie , reading data from cookie into req.cookies
app.use(cookieParser());

//Data santization against NoSQL Query Injection
app.use(mongoSanitize());

//Data santization against XSS
app.use(xss());

//Pervent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "maxGroupSize",
      "difficulty",
      "ratingsAverage",
      "ratingsQuantity",
      "price",
    ],
  })
);

//Test MiddleWare
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // setTimeout(() => {
  //   console.log(req.body);
  // }, 5000);

  next();
});

// 3) ROUTES
// app.use('/api/v1/tours', tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/hosts", hostRouter);
app.use("/api/v1/processes", processesRouter);
app.use("/api/v1/services", servicesRouter);
app.use("/api/v1/arp", arpCacheRouter);
app.use("/api/v1/groups", groupsRouter);
app.use("/api/v1/installedSoftware", InstalledSoftwareRouter);
app.use("/api/v1/interfaceAddresses", InterfaceAddressesRouter);
app.use("/api/v1/listenPorts", ListenPortsRouter);
app.use("/api/v1/localUsers", LocalUsersRouter);
app.use("/api/v1/route", RouteRouter);
app.use("/api/v1/secheduledTasks", ScheduledTasksRouter);
app.use("/api/v1/securityPatches", SecurityPatchesRouter);
app.use("/api/v1/sessions", SessionsRouter);
app.use("/api/v1/usersGroups", UsersGroupsRouter);
app.use("/api/v1/applicationEvent", ApplicationEventRouter);
app.use("/api/v1/systemEvent", SystemEventRouter);
app.use("/api/v1/securityEvents", SecurityEventsRouter);
app.use("/api/v1/powershellEvents", PowershellEventsRouter);

// app.use('/api/v1/reviews', reviewRouter);

//handling undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

//Global error handling middleware
app.use(GlobalErrorHandler);

module.exports = app;
