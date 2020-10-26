const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    /*
        1) Use the messageReactionAdd and messageReactionRemove events to add/remove users roles
        2) Remove the awaitReactions() function as we won't need that anymore
        3) Customize the message a bit more to fit a general welcome channel
    */

    await message.delete().catch(O_o => {});

    //const a = message.guild.roles.get('699580541577461801'); // Verified
    const a = message.guild.roles.get('711218719652577381'); // UDESC
    const b = message.guild.roles.get('711659664743333949'); // Developer

    const embed = new RichEmbed()
        .setTitle('Available Roles')
        //🇨 ${c.toString()}
        .setDescription(`
       
        Roles avaliable in **${message.guild.name}**! You may choose from our list of roles you can join/leave from:

       🇦 ${a.toString()}
       🇧 ${b.toString()}
       
       `)
        .setColor(0xdd9323)
        .setFooter(`Guild ID: ${message.guild.id}`);

    message.channel.send(embed).then(async msg => {

        await msg.react('🇦');
        await msg.react('🇧');
        //await msg.react('🇨');
    });
};

exports.help = {
    name: 'welcomeroles'
};