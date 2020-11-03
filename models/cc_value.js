const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _date: Number,
    ref_id: mongoose.Schema.Types.ObjectId,
    price: String
});

module.exports = mongoose.model('Cc_value', profileSchema);