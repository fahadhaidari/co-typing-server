var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/cotyping_db" || process.env.MONGODB_URI;


var url = "mongodb://localhost:27017/cotyping_db" ||

"mongodb://fahadhaidari:<mongolab1234>@ds145010.mlab.com:45010/heroku_j0zssjqs";

// const query = require('../queries/query.js');

module.exports = function(io) {

  var rooms = [];

// process.env.MONGODB_URI
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    db.collection("room").find({}).toArray(function(err, result) {
      if (err) throw err;
      rooms = result;
      // db.close();
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
      if (room) {

        console.log("Room does exist ", room.name);
        console.log("Has users ", room.users);

        let userNameIndex = room.users.indexOf(_info.userName);
        if (userNameIndex < 0) {
          room.users.push(_info.userName);
          socket.join(_info.roomName);
          console.log("User ", _info.userName, " joined ", _info.roomName);
          console.log("Room users ", room.users);
          socket.emit('success', _info.userName);
          socket.broadcast.to(_info.roomName).emit('joined', _info.userName);
        } else {
          console.log("User does exist");
          socket.emit('user exist', _info.userName);
        }

      } else {
        console.log("Room doesn't exist");
      }

    });

    socket.on("message", function(_info) {
      console.log("Data coming form the client ", _info);
      socket.broadcast.to(_info.roomName).emit('message', _info);
    });


    socket.on("get users", function(_roomName) {
      console.log("getting users..........");
      let room = findRoom(_roomName);
      console.log("---------------------- ", room.users);
      socket.emit("room users", room.users);
    });


    socket.on("signout", function(_info) {
      console.log("User ", _info.userName, " is leaving ", _info.roomName);
      removeUserFromRoom(_info.userName, _info.roomName);
      socket.broadcast.to(_info.roomName).emit('user signout', _info);
      socket.emit('signout success', _info);
    });

    socket.on("signed out", function(_info) {
      socket.broadcast.to(_info.roomName).emit('signed out', _info);
    });

    function findRoom(_roomName) {
      for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].name == _roomName) {
          return rooms[i];
          break;
        }
      }
    }

    function removeUserFromRoom(_userName, _roomName) {
      let breakMainLoop = false;
      for (var i = 0; i < rooms.length; i++) {
        if (breakMainLoop) {
          break;
        }
        if (rooms[i].name == _roomName) {
          let room = rooms[i];
          for (var i = 0; i < room.users.length; i++) {
            if (room.users[i] == _userName) {
              room.users.splice(i, 1);
              breakMainLoop = true;
              break;
            }
          }
        }
      }
    }

  });

}
