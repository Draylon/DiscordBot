const { MessageEmbed } = require('discord.js');
var randomColor = require('random-color');
exports.run = (client, message, args) => {

    var color = randomColor();

    const member = message.member;
    message.delete();
    let embed = new MessageEmbed()
    .setTitle("User")
    .setThumbnail(member.user.avatarURL())
    .addField("Your nickname is ",member.displayName)
    .addField("Your Discord tag is ",member.user.tag)
    .setColor(color.hexString());
    message.channel.send(embed);

};

exports.help = {
    name: 'myname'
};