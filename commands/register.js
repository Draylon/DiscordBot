const { MessageEmbed } = require('discord.js');
const { registerUser } = require('../utils');

exports.run = async (client, message, args) => {
    const member = message.member;

    // allow optional timezone offset argument
    let offset = 0;
    if (args.length > 0) {
        const parsed = parseFloat(args[0]);
        if (!isNaN(parsed)) offset = parsed;
    }

    const created = await registerUser(client, member, offset);

    if (!created) {
        return message.channel.send('You are already registered.');
    }

    const embed = new MessageEmbed()
        .setTitle('Registration complete')
        .setDescription('Your profile has been created.')
        .setColor(0x36c98e);

    message.channel.send(embed);
};

exports.help = {
    name: 'register'
};
