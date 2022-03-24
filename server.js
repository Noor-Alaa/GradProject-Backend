const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

//handling programming errors (bugs for synchronous code)
process.on("uncaughtException", err => {
  console.log("UncaughtException shutting down..");
  console.log(err.stack);
  process.exit(1);
});

const app = require("./app");
const myServer = http.createServer(app);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch(err => {
    console.log("UnhandledRejection shutting downnnnnnnnn ..");
    console.log(err);
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

const io = new Server(myServer, {
  cors: {
    origin: "*",
  },
});

const dummyProcess = [
  {
    name: "smss.exe",
    ppid: "4",
    path: "C:\\Windows\\System32\\smss.exe",
    pid: "316",
    host: "placeHolder",
  },
  {
    name: "smssxxx.exe",
    ppid: "4",
    path: "C:\\Windows\\System32\\smss.exe",
    pid: "316",
    host: "placeHolder",
  },
  {
    name: "smss.exe",
    ppid: "4",
    path: "C:\\Windows\\System32\\smss.exe",
    pid: "316",
    host: "placeHolder",
  },
  {
    name: "smss.exe",
    ppid: "4",
    path: "C:\\Windows\\System32\\smss.exe",
    pid: "316",
    host: "placeHolder",
  },
  {
    name: "smss.exe",
    ppid: "4",
    path: "C:\\Windows\\System32\\smss.exe",
    pid: "316",
    host: "placeHolder",
  },
];

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("processess", id => {
    socket.emit("sendProcessess", id);
    socket.emit("processData", dummyProcess);
    console.log(`id:${id} was sent`);
  });
});

const port = process.env.PORT || 5000;
const server = myServer.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//handling uncaught promise rejection (ofcourse for asynchronous code)
process.on("unhandledRejection", err => {
  console.log("UnhandledRejection shutting down ..");
  console.log(err);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
