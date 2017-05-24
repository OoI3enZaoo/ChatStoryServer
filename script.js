var express = require('express');
var app = express();
var path = require('path');
//var bodyParser = require("body-parser");
var mongojs = require('mongojs');
var db = mongojs('mongodb://tete:tete@ds061345.mlab.com:61345/bendb', ['chatstory']);


console.log("test");
db.on('connect', function() {
    console.log('mongoDB connected')
});
db.on('error', function(err) {
    console.log('mongoDB error', err)
});

db.benna.find(function (err, docs) {
	console.log("docs: " + docs);
})
app.use(express.static(path.join(__dirname, '/public')));

app.get('/a', function(req, res) {
     db.chatstory.find(function(err, docs) {
         res.json(docs);
     });
});

app.get('/get/', function (req, res) {
  res.send("/type");
});
app.get('/get/type/', function (req, res) {
  res.send("/All Love /Drama /Horror /Fantasy /Mystery /Paranormal");
});
app.get('/get/type/:type', function (req, res) {
  var type = req.params.type;
  if(type != "all"){
      db.chatstory.find({story: {$elemMatch: {type:type}}}, function (err, doc) {
    res.json(doc);
    });
  }else{
    db.chatstory.find(function(err, docs) {
        res.json(docs);
    });
  }

});

app.get('/a2', function (req, res) {
  //var myname = req.params.name;
  //res.send("test: " + myname);
      db.chatstory.find({_id:mongojs.ObjectId("59254b585fabe2814d8a66c6")}, function (err, doc) {
    res.json(doc);
  });
});
app.get('/b', function(req, res) {
     db.data_info.find(function(err, docs) {
         res.json(docs);
     });
});

app.get('/get/story/:id', function (req, res) {
  //var myname = req.params.name;
  var id = req.params.id;
  //res.send("test: " + myname);
  //59254d115fabe2814d8a66c8
      db.chatstory.find({_id:mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  db.data_info.findOne({_id: mongojs.ObjectId(id) }, function (err, doc) {
    res.json(doc);
  });
});

app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/test.html'));
});

var port = 1338;
app.listen(port);
console.log("Server is running on port :" + port);
