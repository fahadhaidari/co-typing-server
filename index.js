const express = require("express");
const sockets = require("./socket/index.js");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);


sockets(io);


app.use(function(req, res, next) {
  var err = new Error("Not found");
  err.status = 404;
  next(err);
});


server.listen(8080, function() {
  console.log("Listening on PORT:8080");
});

module.exports = {
  app,
  server
}
