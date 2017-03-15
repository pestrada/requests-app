var assert = require('chai').assert;
var request = require('request');

describe('index', function () {
    it('renders index page', function (done) {
        request.get('http://localhost:3000/', function (error, response, body) {
            assert(response.statusCode == 200);
            done();
        });
    });
});

describe('login', function () {
    it('renders login form', function (done) {
        request.get('http://localhost:3000/login', function (error, response, body) {
            assert(response.statusCode == 200, 'error on request response');
            assert(body.includes('Login page'), 'page does not include text');
            done();
        });
    });

    
});
