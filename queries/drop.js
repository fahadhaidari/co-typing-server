// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/cotyping_db" || process.env.MONGODB_URI;
const db = require("../index.js");

(function() {
  // MongoClient.connect(url, function(err, db) {
    // if (err) throw err;
    db.collection("room").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  // });
})();
