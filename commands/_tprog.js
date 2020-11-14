
const ProgressBar = require('../utils/Progress');
const DateParser = require('../utils/DateParser');

exports.run = async( client,message,args) => {
    
    /*var pbar = ProgressBar({
        curr:args[0],
        incomplete:'_',
        complete: ':',
        head: '#',
        width:55,
        total: Math.max(args[1],1)
    });
    console.log(pbar.percent+" "+pbar.bar);
    console.log(pbar.curr+" "+pbar.total);
    message.delete();
    message.channel.send("Percent: "+pbar.percent+"\n`"+pbar.bar+"`");*/

    let ms = DateParser("date 16:00",Date.now());
    console.log(ms);
    
};

exports.help={
    name:"tprog"
};