const express = require('express');
const router = express.Router();
const query = require('../queries/query.js');
const seeds = require('../queries/seeds.js');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/cotyping_db";

router.get('/rooms', function(req, res) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
      db.collection("room").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });

});

function getAllRooms() {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
      db.collection("room").find({}).toArray(function(err, result) {
      if (err) throw err;
      return new Promise(result);
      console.log(result);
      db.close();
    });
  });
}


module.exports = router;
