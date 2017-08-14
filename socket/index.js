module.exports = function(io) {

  io.on("connection", function(socket) {
    console.log("user connected...");
    socket.broadcast.emit("on connection", "user connected...");
  });

}
