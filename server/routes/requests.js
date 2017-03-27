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
  const len = requests.length;
  for (let i = 0; i < len; i++) {
    if (requests[i].id == req.params.id) {
      requests[i].type = req.body.type;
      break;
    }
  }
  res.json({ data: 200 });
});

module.exports = router;
