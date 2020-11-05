module.exports = async (client, member) => {

    const newProfile = {
        guildID: member.guild.id,
        guildName: member.guild.name,
        userID: member.id,
        username: member.user.tag
    };
    
    try {
        await client.createProfile(newProfile);
    } catch (err) {
        console.error(err);
    }

    /*
    let userLogs = member.guild.channels.cache.get(client.config.defaultSettings.logsChannelID);
    userLogs.send(`${member.user.tag} has joined **${member.guild}**!`);
    */
};