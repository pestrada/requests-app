var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dbSchema = require('../schema/DbSchema.js');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('*** Connected to MongoDB !! ***');
});

router.get('/', function(req, res, next) {
  dbSchema.Request.find(function (err, requests) {
    if (err) return console.error(err);
    res.json({ data: requests });
  });
});

router.get('/:requestType', function(req, res, next) {
  console.log(req.params);
  dbSchema.Request.find({type: req.params.requestType}, function (err, requests) {
    if (err) return console.error(err);
    res.json({ data: requests });
  });
});

router.patch('/:id', function(req, res, next) {
  const query = { _id: req.params.id };
  const values = {
    type: req.body.type,
    votes: req.body.votes
  };
  const options = { upsert: true};
  dbSchema.Request.update(query, values, options, function (err, raw) {
    if (err) return console.error(err);
    res.json({ data: 200 });
  });
});

router.post('/', function(req, res, next) {
  const newRequest = new dbSchema.Request({
    description: req.body.description,
    type: 'pending',
    votes: 0
  });
  
  newRequest.save(function (err, newRequest) {
    if (err) return console.error(err);
  });
  res.json({data: 200});
});

module.exports = router;
