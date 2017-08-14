var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/cotyping_db";
const query = require('../queries/query.js');

module.exports = function(io) {

  var rooms = [];

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
      db.collection("room").find({}).toArray(function(err, result) {
      if (err) throw err;
      rooms = result;
      db.close();
    });
  });

  io.on("connection", function(socket) {
    console.log("user connected...");
    console.log("Rooms ------------", rooms);
    // socket.broadcast.emit("on connection", "user connected...");
    socket.emit("on connection", "user connected...");


    io.on("join room", function(_data) {
      let wantedRoomIndex = rooms.indexOf(_data.roomName);
      let room = undefined;
      if(wantedRoomIndex > 0) {
        room = rooms[wantedRoomIndex];

        let userNameIndex = room.users[_data.userName];
        if(userNameIndex < 0) {
          room.users.push(_data.userName);
        } else {
          console.log("Use does exist");
        }

      } else {
        console.log("Room doesn't exist");
      }

    });

  });

}
