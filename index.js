const app = require("express")();
const http = require("http").Server(app);
const sockets = require("./socket");
const io = require("socket.io")(http);

const room = require('./routes/room');


// const express = require("express");
// const sockets = require("./socket/index.js");
// const http = require("http");
// const app = express();
// const server = http.createServer(app);
// const io = require("socket.io")(server);


sockets(io);

app.use('/', room);


app.use(function(req, res, next) {
  var err = new Error("Not found");
  err.status = 404;
  next(err);
});


http.listen(8080, function() {
  console.log("Listening on PORT:8080");
});

// server.listen(8080, function() {
//   console.log("Listening on PORT:8080");
// });
//
// module.exports = {
//   app,
//   server
// }
