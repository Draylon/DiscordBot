module.exports = async (client, messageReaction, user) => {

    const message = messageReaction.message;
    const reactionChannel = messageReaction.channel;

    const member = message.channel.guild.members.get(user.id);
    if (member.user.bot) return;
    
    // ===========================
    
    const { rolesChannelName } = client.config.defaultSettings;
    const rolesChannel = message.guild.channels.find(c => c.name === rolesChannelName);

    const a = message.guild.roles.get('711218719652577381'); // UDESC
    const b = message.guild.roles.get('711659664743333949'); // Developer

    if (['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === rolesChannel.id) {
        switch (messageReaction.emoji.name) {
            case '🇦':
                member.removeRole(a).catch(console.error);
                break;
            case '🇧':
                member.removeRole(b).catch(console.error);
                break;
            /*case '🇨':
                member.removeRole(c).catch(console.error);
                break;*/
            default:
                break;
        }
    }
};