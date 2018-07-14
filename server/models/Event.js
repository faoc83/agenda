var mongoose = require('mongoose');
var User = require('../models/User.js');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var EventSchema = new Schema({
    title: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String },
    allDay: {
        type: Boolean,
        default:false
    },
    user: [{
        type: ObjectId,
        ref: "User"
    }]
}, { timestamps: { createdAt: 'created_at' } });

EventSchema.pre('remove', function (next) {
    this.model('user').update({ events: this._id }, { $pull: { events: this._id } }, { multi: true },
        next
    );
});

module.exports = mongoose.model('event', EventSchema);