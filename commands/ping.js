const {MessageEmbed} = require('discord.js');
exports.run = (client, message, args) => {
    // It sends the user "Pinging"
    message.delete();
    message.channel.send("Pinging...").then(m =>{
    // The math thingy to calculate the user's ping
        var ping = m.createdTimestamp - message.createdTimestamp;

    // Basic embed
        var embed = new MessageEmbed()
        .setAuthor(`Your ping is ${ping}`)
        .setDescription(`${message.author}`)
        .setColor("Your Color")
        
        // Then It Edits the message with the ping variable embed that you created
        m.edit(embed)
        m.delete({timeout:30000});
    });
};

exports.help = {
    name: 'ping'
};