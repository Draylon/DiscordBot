module.exports = (client, member) => {

    const {logsChannelName} = client.config.defaultConfig;
    let userLogs = member.guild.channels.find(c => c.name === logsChannelName);

    // anthony#8577
    userLogs.send(`${member.user.tag} has left **${member.guild}**!`);

};