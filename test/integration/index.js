var assert = require('assert');
var request = require('request');

describe('index', function () {
    it('should render index page', function() {
        request('http://localhost:3000/index', function (error, response, body) {
            assert(response.statusCode, 200);
        });
    });
});