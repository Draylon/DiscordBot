const { MessageEmbed } = require('discord.js');
const randomColor = require('random-color');
const ProgressBar = require('../utils/Progress');

const alphabet_reactions = require("../utils/alphabet_array");
const menu_buttons = ['✅','❌'];
exports.run = (client, message, args) => {
    const general_filter = (reaction, user) => alphabet_reactions.concat(menu_buttons).includes(reaction.emoji.name);
    message.delete();
    
    let margs = args.join(" ").split("|");
    if(margs < 2)
        return message.channel.send("Missing Parameters!").then(del_msg=>del_msg.delete({timeout:3000}));
    
    const embed = new MessageEmbed()
    .setColor(randomColor().hexString())
    .setAuthor('Data')
    .setFooter(`${message.author.id}`)
    .setDescription(margs[1])
    //.setURL(`http://aa.com`)
    .setTitle(margs[0]);
    
    message.channel.send(embed);

};

exports.help = {
    name: 'agenda'
};
