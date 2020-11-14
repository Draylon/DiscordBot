
const ProgressBar = require('../utils/Progress');
const DateParser = require('../utils/DateParser');

exports.run = async( client,message,args) => {
    
    message.delete();
    let date1=new Date(),
    server_delay = (date) => {
        return (1000*60*60*(date1.getUTCHours()-date1.getHours())+
        1000*60*(date1.getUTCMinutes()-date1.getMinutes())+
        1000*(date1.getUTCSeconds()-date1.getSeconds())+
        (date1.getUTCMilliseconds()-date1.getMilliseconds()))
    }
    message.channel.send(date1+"\n"+server_delay(date1));
    
};

exports.help={
    name:"tprog"
};