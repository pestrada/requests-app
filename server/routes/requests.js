var express = require('express');
var router = express.Router();

var requests = [
  {
    id: 1,
    description: 'request 1',
    type: 'pending'
  },
  {
    id: 2,
    description: 'request 2',
    type: 'pending'
  },
  {
    id: 3,
    description: 'request 3',
    type: 'pending'
  }
];

router.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({ data: requests });
});

module.exports = router;
