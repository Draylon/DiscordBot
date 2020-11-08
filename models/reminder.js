const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    users: [String],
    roles: [String],
    users_snowFlake:[String],
    roles_snowFlake:[String],
    date: Number,
    topic: String,
    channelID: String,
    guildID: String
});

module.exports = mongoose.model('Reminder', profileSchema);

