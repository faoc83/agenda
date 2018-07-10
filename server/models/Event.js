var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startDate: { type: String, required: true},
    endDate: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId }

});

module.exports = mongoose.model('event', EventSchema);