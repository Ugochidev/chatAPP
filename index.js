const express = require("express");
const socket = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();
const serve = require("./src/app");
// app setup
const app = express();
const server = app.listen(process.env.PORT, function () {
  console.log("listening to requests on PORT");
});
// Static files
app.use(express.static("public"));

const connectDB = require("./src/config/database");
const environment = require("./src/config/environment");

serve().then(async () => {
  await connectDB();
  (await serve()).listen(environment.port);
  console.log(`server listening on ${environment.port}`);
});

//  socket setup
const io = socket(server);
io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  socket.on("chat", function (chat) {
    io.sockets.emit("chat", chat);
     console.log(chat.message);
  });
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
