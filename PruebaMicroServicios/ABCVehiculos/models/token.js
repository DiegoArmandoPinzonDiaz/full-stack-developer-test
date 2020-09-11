'use strict'

var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, {
    collection: 'token'
});

module.exports = mongoose.model('Token', TokenSchema);