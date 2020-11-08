exports.run = async (client,msg,args) =>{
    //const args = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
    var amount = args.join(' '); // Amount of messages which should be deleted
    if (!amount) return msg.reply('You haven\'t given an amount of messages which should be deleted!').then(msg1 => {msg1.delete({timeout:3000});msg.delete();}); // Checks if the `amount` parameter is given
    if (isNaN(amount)) return msg.reply('The amount parameter isn`t a number!').then(msg1 => {msg1.delete({timeout:3000});msg.delete();}); // Checks if the `amount` parameter is a number. If not, the command throws an error
    amount++;
    if (amount > 100) return msg.reply('You can`t delete more than 100 messages at once!').then(msg => {msg1.delete({timeout:3000});msg.delete();}); // Checks if the `amount` integer is bigger than 100
    if (amount < 1) return msg.reply('You have to delete at least 1 message!').then(msg1 => {msg1.delete({timeout:3000});msg.delete();}); // Checks if the `amount` integer is smaller than 1

    await msg.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
            // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
        msg.channel.bulkDelete(messages).catch(e=>{
        if(e.message == 'You can only bulk delete messages that are under 14 days old.')
            return msg.channel.send(e.message);
        console.log(e);
        });
    });
};

exports.help ={
    name:'clear'
}