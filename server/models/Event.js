var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    start: { type: String, required: true, unique: true },
    end: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('event', EventSchema);