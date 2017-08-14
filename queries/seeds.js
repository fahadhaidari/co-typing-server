var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/cotyping_db";

module.exports = {

  seedRooms: function() {

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var rooms = [{
          name: "Room1",
          owner: "User1",
          users: []
        },
        {
          name: "Room2",
          owner: "User2",
          users: []
        },
        {
          name: "Room3",
          owner: "User3",
          users: []
        },
        {
          name: "Room4",
          owner: "User1",
          users: []
        },
        {
          name: "Room5",
          owner: "User1",
          users: []
        },
        {
          name: "Room6",
          owner: "User2",
          users: []
        }
      ];
      db.collection("room").insertMany(rooms, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
      });
    });

  }
}
