var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/cotyping_db";

(function() {
  MongoClient.connect(process.env.MONGODB_URI, function(err, db) {
    if (err) throw err;
    db.collection("room").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
      db.close();
    });
  });
})();
