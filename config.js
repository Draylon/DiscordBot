require('dotenv-flow').config();

module.exports = {
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    mongoURI: process.env.MONGO_URI,
    defaultSettings: {
        prefix: process.env.PREFIX,
        welcomeChannelID: '759222126912864319',
        rolesChannelID: '769707045489475584',
        logsChannelID: '769750038049718272',
        configsChannelID: '759225223882473483',
        notificationChannelID: '689444720883269873',
        welcomeMsg: 'Welcome {{user}} to {{guild}}!',
        modRole: '_staff',
        adminRole: 'admin'
    }
};