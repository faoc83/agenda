var mongoose = require('mongoose');
var Event = require('../models/Event.js');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    events: [{
        type: ObjectId,
        ref: 'event'
    }]
}, { usePushEach: true });

module.exports = mongoose.model('user', UserSchema);