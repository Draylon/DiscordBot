module.exports = async (client, messageReaction, user) => {


    const message = messageReaction.message;

    const member = message.channel.guild.members.get(user.id);
    if (member.user.bot) return;
    
    // ===========================
    
    const { welcomeChannelName,rolesChannelName } = client.config.defaultSettings;
    const welcomeChannel = message.guild.channels.find(c => c.name === welcomeChannelName);
    const rolesChannel = message.guild.channels.find(c => c.name === rolesChannelName);
    

    const a = message.guild.roles.get('711218719652577381'); // UDESC
    const b = message.guild.roles.get('711659664743333949'); // Developer

    const verify = message.guild.roles.get('699580541577461801'); // Verified


    // ==============================================
    // ==============================================
    // ==============================================

    // WELCOME VERIFICATION
    // Verify a member once they have reacted to the message in the verify channel (gives them the Verified role)
    if (messageReaction.emoji.name === '✅' && message.channel.id === welcomeChannel.id) {
        member.addRole(verify).catch(console.error);
        return messageReaction.remove(member).catch(console.error);
    }

    // AVALIABLE ROLES
    // Adds/removes a user from a joinable role via the welcome
    if (['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === rolesChannel.id) {
        switch (messageReaction.emoji.name) {
            case '🇦':
                member.addRole(a).catch(console.error);
                break;
            case '🇧':
                member.addRole(b).catch(console.error);
                break;
            /*case '🇨':
                member.addRole(c).catch(console.error);
                break;*/
            default:
                break;
        }
        return;
    }

    // BITCOIN_MENU
    if(['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name)){
        
    }
};