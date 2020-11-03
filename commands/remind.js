
const { DateParser } = require('../utils/DateParser');

exports.run = async (client, message, args) => {

    const parameters = args.join(' ');
    if(parameters.length < 1)
        return message.channel.send("Insuficient parameters!!").then(msg =>msg.delete(4000));
    const user_list = parameters[0];
    parameters.slice(1);
    date = parameters.join(' ').trim();
    let ms = DateParser.fromText(date);
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