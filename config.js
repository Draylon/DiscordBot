require('dotenv-flow').config();

module.exports = {
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    mongoURI: process.env.MONGO_URI,
    defaultSettings: {
        prefix: process.env.PREFIX,
        welcomeChannelName: '_welcome',
        rolesChannelName: '_roles',
        logsChannelName: '_logs',
        welcomeMsg: 'Welcome {{user}} to {{guild}}!',
        modRole: '_staff',
        adminRole: 'admin'
    }
};