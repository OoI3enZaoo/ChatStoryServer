var express = require('express');
var app = express();
var path = require('path');
//var bodyParser = require("body-parser");
var mongojs = require('mongojs');
var db = mongojs('mongodb://benkung:1320@ds061345.mlab.com:61345/bendb', ['data_info','pic_info']);


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

app.get('/contactlist2', function(req, res) {
     db.data_info.find(function(err, docs) {
         res.json(docs);
     });
});
app.get('/contactlist3', function(req, res) {
     db.pic_info.find(function(err, docs) {
         res.json(docs);
     });
});
app.get('/contactlist3/:id', function (req, res) {
  var id = req.params.id;
  db.pic_info.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  db.data_info.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/test.html'));
});

var port = 1338;
app.listen(port);
console.log("Server is running on port :" + port);
