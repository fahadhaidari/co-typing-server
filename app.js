const express = require("express");
const sockets = require("./socket");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = requrie("socket.io")(server);


sockets(io);


app.use(function(req, res, next) {
  var err = new Error("Not found");
  err.status = 404;
  next(err);
});

module.exports = {
  app,
  server
}
