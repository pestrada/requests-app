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
  res.json({ data: requests });
});

router.get('/:requestType', function(req, res, next) {
  const data = requests.filter((r) => {
    return r.type == req.params.requestType;
  });
  res.json({ data: data });
});

router.patch('/:id', function(req, res, next) {
  const data = requests.map((r) => {
    if (r.id == req.params.id) {
      r.type = req.body.type;
    }
    return r;
  });
  res.json({ data: data });
});

module.exports = router;
