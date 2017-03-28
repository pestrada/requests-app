var mongoose = require('mongoose');

var RequestSchema = mongoose.Schema({
    description: String,
    type: String,
    votes: Number
});

exports.Request = mongoose.model('Request', RequestSchema);