var express = require('express');
var router = express.Router();

var requests = [
  {
    id: 1,
    description: 'request pending',
    type: 'pending'
  },
  {
    id: 2,
    description: 'request Approved',
    type: 'approved'
  },
  {
    id: 3,
    description: 'request Rejected',
    type: 'rejected'
  }
];

router.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({ data: requests });
});

router.get('/:requestType', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const data = requests.filter((r) => {
    return r.type == req.params.requestType;
  });
  res.json({ data: data });
});

module.exports = router;
