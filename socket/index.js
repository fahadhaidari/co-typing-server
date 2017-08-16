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
    // console.log("Rooms ------------", rooms);
    // socket.broadcast.emit("on connection", "user connected...");
    // socket.emit("on connection", "user connected...");

    socket.on("join room", function(_info) {
      let room = findRoom(_info.roomName);

      console.log("Server info ", _info)
      if(room) {

        console.log("Room does exist " , room.name);

        let userNameIndex = room.users.indexOf(_info.userName);
        if(userNameIndex < 0) {
          room.users.push(_info.userName);
          socket.join(_info.roomName);
          console.log("User " , _info.userName, " joined " , _info.roomName);
          console.log("Room users " , room.users);
          socket.emit('success', _info.userName);
          socket.broadcast.to(_info.roomName).emit('joined', _info.userName);

        } else {
          console.log("User does exist");
        }

      } else {
        console.log("Room doesn't exist");
      }

    });

    socket.on("message", function(_info) {
      console.log("Data coming form the client " , _info);
    });


    function findRoom(_roomName) {
      for (var i = 0; i < rooms.length; i++) {
        if(rooms[i].name == _roomName) {
          return rooms[i];
          break;
        }
      }
    }

  });

}
