
const {DateParser} = require('../utils');

exports.run = async (client, message, args) => {
    if(args.length < 1)
    return message.channel.send("Insuficient parameters!!").then(msg =>msg.delete({timeout:4000}));
    const user_list = args[0];
    args.splice(0,1);
    date = args.join(' ').trim();
    let ms = DateParser.fromText(date);
    
    message.channel.send(`
    reminding ${user_list}
    date: ${ms}
    ${Date(ms - Date.now()).toString()}
    `).then(msg=>msg.delete({timeout:15000}));
    
    if(ms > 0){
        
    }else{
        //invalid reminder!!!
    }

    /*message.channel.send(`Comming soon! ${message.author}`).then(msg => {
        msg.delete(7000).then(m=>{
            message.delete();
        });
    });*/

};
exports.help = {
    name: 'remind'
};