module.exports = (client, member) => {

    let userLogs = member.guild.channels.cache.get(client.config.defaultSettings.notificationChannelID);

    // anthony#8577
    userLogs.send(`${member.user.tag} has left **${member.guild}**!`);

};