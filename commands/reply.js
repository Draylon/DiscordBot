exports.run = (client, message, args) => {

    const response = args.join(' ');
    message.reply(response);

};

exports.help = {
    name: 'reply'
};