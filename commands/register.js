const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    const member = message.member;
    const exists = await client.profileExists(member.id);

    if (exists) {
        return message.channel.send('You are already registered.');
    }

    const profile = {
        guildID: member.guild.id,
        guildName: member.guild.name,
        userID: member.id,
        username: member.user.tag,
        joinDate: Date.now()
    };

    // allow optional timezone offset argument
    if (args.length > 0) {
        const offset = parseFloat(args[0]);
        if (!isNaN(offset)) profile.tz_offset = offset;
    }

    await client.createProfile(profile);

    const embed = new MessageEmbed()
        .setTitle('Registration complete')
        .setDescription('Your profile has been created.')
        .setColor(0x36c98e);

    message.channel.send(embed);
};

exports.help = {
    name: 'register'
};
