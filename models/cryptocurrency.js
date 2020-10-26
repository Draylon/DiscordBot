const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coinID: String,
    coinName: String,
    priceUSD: String,
    latestUSD: [String]
});

module.exports = mongoose.model('Cryptocurrency', profileSchema);