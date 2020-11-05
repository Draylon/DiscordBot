exports.run = (client, message, args) => {

    message.delete();
    message.channel.send("Polls coming soon!");

};

exports.help = {
    name: 'poll'
};