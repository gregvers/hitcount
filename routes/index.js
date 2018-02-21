var express = require('express');
var router = express.Router();

function renderPageAndCloseDB(res, db, hostname) {
  var datetime = new Date();
  db.collection('appserverhits').find().toArray(function (err, docs) {
    if (err) throw err;
    console.log("Page rendered with data: ");
    console.log(docs);
    res.render('index', { title: 'HitCount', hostname: hostname, datetime: datetime, results: docs, pageTestScript: '/tests/tests-index.js'});
    console.log("Database closed.");
    db.close();
  });
}

function incrementAppServerHit(res, db, callback) {
  var os = require("os");
  var hostname = os.hostname()
  db.collection('appserverhits').findOne({ appserver: hostname }, function(err, result) {
    if (err) throw err;
    if (result) {
      db.collection('appserverhits').update({ appserver: hostname }, { $inc: {hit: 1} }, function(err, result) {
        if (err) throw err;
        if (typeof callback === "function") {
          callback(res, db, hostname);
        }
      });
    }
    else {
      db.collection('appserverhits').insert( { appserver: hostname, hit: 1 } , function(err, result) {
        if (err) throw err;
        if (typeof callback === "function") {
          callback(res, db, hostname);
        }
      });
    }
  });
}

router.get('/', function(req, res, next) {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://" + process.env.MONGODB_SERVICE_HOST + ":" + process.env.MONGODB_SERVICE_PORT + "/hitcount";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database connected.");
    incrementAppServerHit(res, db,
      renderPageAndCloseDB
    );
  });
});

module.exports = router;
