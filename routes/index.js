var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var os = require("os");
  var serverhitresult = [];
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://" + process.env.MONGODB_SERVICE_HOST + ":" + process.env.MONGODB_SERVICE_PORT + "/hitcount";  var datetime = new Date();
  var hostname = os.hostname()
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database connected.");
    db.collection('appserverhits').findOne({ appserver: hostname }, function(err, result) {
      if (err) throw err;
      serverhitresult = result;
      if (result) {
        db.collection('appserverhits').update({ appserver: hostname }, { $inc: {hit: 1} }, function(err, result) {
          if (err) throw err;
          db.collection('appserverhits').find().toArray(function (err, docs) {
              console.log("Page rendered with data: ");
              console.log(docs);
              res.render('index', { title: 'HitCount', hostname: os.hostname(), datetime: datetime, results: docs });
              db.close();
              console.log("Database closed.");
          });
        });
      }
      else {
        db.collection('appserverhits').insert( { appserver: hostname, hit: 1 } , function(err, result) {
          if (err) throw err;
          db.collection('appserverhits').find().toArray(function (err, docs) {
              console.log("Page rendered with data: ");
              console.log(docs);
              res.render('index', { title: 'HitCount', hostname: os.hostname(), datetime: datetime, results: docs });
              db.close();
              console.log("Database closed.");
          });
        });
      }
    });
  });
});

module.exports = router;
