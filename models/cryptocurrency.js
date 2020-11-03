const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coinID: String
});

module.exports = mongoose.model('Cryptocurrency', profileSchema);