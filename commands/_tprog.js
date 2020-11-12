
const ProgressBar = require('../utils/Progress');


exports.run = async( client,message,args) => {
    var pbar = new ProgressBar(':bar',{
        curr:args[0],
        incomplete:'_',
        complete: ':',
        head: '#',
        width:55,
        total: Math.max(args[1],1)
    });
    pbar.render();
    message.delete();
    message.channel.send("Percent: "+pbar.prcnt+" `"+pbar.lastDraw+"`");
    pbar.terminate();
};

exports.help={
    name:"tprog"
};