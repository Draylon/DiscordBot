module.exports = async (client, messageReaction, user) => {

    const message = messageReaction.message;
    const reactionChannel = messageReaction.channel;

    const member = message.channel.guild.members.cache.get(user.id);
    if (member.user.bot) return;
    
    // ===========================
    
    const rolesChannel = message.guild.channels.cache.get(client.config.defaultSettings.rolesChannelID);

    const a = message.guild.roles.cache.get('711218719652577381'); // UDESC
    const b = message.guild.roles.cache.get('711659664743333949'); // Developer

    if (['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === rolesChannel.id) {
        switch (messageReaction.emoji.name) {
            case '🇦':
                member.roles.remove(a).catch(console.error);
                break;
            case '🇧':
                member.roles.remove(b).catch(console.error);
                break;
            /*case '🇨':
                member.removeRole(c).catch(console.error);
                break;*/
            default:
                break;
        }
    }
};