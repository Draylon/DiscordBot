const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mention: String,
    date: Number,
    title: String,
    text: String,
    alert_overdue: Boolean
});

module.exports = mongoose.model('reminder', profileSchema);