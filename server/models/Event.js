var mongoose = require('mongoose');
var User = require('../models/User.js');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var EventSchema = new Schema({
    title: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String },
    user: [{
        type: ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model('event', EventSchema);