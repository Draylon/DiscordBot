const { registerUser } = require('../utils');

module.exports = async (client, member) => {

    try {
        const created = await registerUser(client, member);
        if (!created) {
            console.log(member.user.tag + " Rejoined!");
        }

    } catch (err) {
        console.error(err);
    }

    /*
    let userLogs = member.guild.channels.cache.get(client.config.defaultSettings.logsChannelID);
    userLogs.send(`${member.user.tag} has joined **${member.guild}**!`);
    */
};
