
const ProgressBar = require('../utils/Progress');
const DateParser = require('../utils/DateParser');

exports.run = async( client,message,args) => {
    
    message.delete();
    let date1=new Date(),
    date2=new Date(Date.now());
    let server_delay = (server,utc) => {
        return (utc.getTime()-server.getTime());
    }
    message.channel.send(date1+"\n"+date2+" "+server_delay(date1,date2));
    
};

exports.help={
    name:"tprog"
};