var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/cotyping_db";

module.exports = {

  createDB: function() {

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created! ", db);
      db.close();
    });

  },

  createCollection: function() {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.createCollection("room", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
    });
  },

  getAllRooms: function() {

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("room").find({}).toArray(function(err, result) {
        if (err) throw err;
        // console.log(result);
        return result;
        db.close();
      });
    });
  },

  deleteCollection: function(_collectionName) {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      db.collection("room").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
      });
    });
  }
}
