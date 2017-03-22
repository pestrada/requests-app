var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login page', username: 'paul' });
});

router.post('/', function(req, res, next) {
    var user = {
        name: 'paul',
        password: '123'
    };
    
    if (req.body.username == user.name && req.body.password == user.password) {
        res.render('index', {username: user.name});
    } else {
        res.send('username or password is incorrect.');
    }
});

module.exports = router;
