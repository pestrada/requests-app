var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({ data: [1,2,3] });
});

module.exports = router;
