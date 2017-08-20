const app = require("express")();
const http = require("http").Server(app);
const sockets = require("./socket");
const io = require("socket.io")(http);
// const room = require('./routes/room');
const cors = require("cors");

var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/cotyping_db" || process.env.MONGODB_URI;


var url = "mongodb://localhost:27017/cotyping_db" || "mongodb://fahadhaidari:<mongolab1234>@ds145010.mlab.com:45010/heroku_j0zssjqs";




var db = undefined;

sockets(io);




// app.use('/', room);




//
// app.use(function(req, res, next) {
//   var err = new Error("Not found");
//   err.status = 404;
//   next(err);
// });


  http.listen(process.env.PORT || 3000, function() {
    console.log("Listening on PORT:3000");
  });



MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;

  console.log("Database connection ready");






  // module.exports.db = db;


});

app.get('/rooms', function(req, res) {

  return db.collection("room").find({}).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    res.json(result);
    db.close();
  });

});

app.get('/create', function(req, res) {

  db.createCollection("room", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });

});


app.get('/delete', function(req, res) {
  db.collection("room").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});


app.get('/seed', function(req, res) {


  var rooms = [{
      name: "Room1",
      owner: "User1",
      users: ["User1"]
    },
    {
      name: "Room2",
      owner: "User2",
      users: ["User2"]
    },
    {
      name: "Room3",
      owner: "User3",
      users: ["User3"]
    },
    {
      name: "Room4",
      owner: "User1",
      users: ["User1"]
    },
    {
      name: "Room5",
      owner: "User1",
      users: ["User1"]
    },
    {
      name: "Room6",
      owner: "User2",
      users: ["User2"]
    }
  ];
  db.collection("room").insertMany(rooms, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });

});


app.get('/drop', function(req, res) {
  db.collection("room").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});

app.use(cors());
