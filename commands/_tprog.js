
const ProgressBar = require('../utils/Progress');


exports.run = async( client,message,args) => {
    
    var pbar = ProgressBar({
        curr:args[0],
        incomplete:'_',
        complete: ':',
        head: '#',
        width:55,
        total: Math.max(args[1],1)
    });
    pbar.render();
    console.log(pbar.percent+" "+pbar.bar);
    console.log(pbar.curr+" "+pbar.total);
    message.delete();
    message.channel.send("Percent: "+pbar.prcnt+" `"+pbar.lastDraw+"`");
    pbar.terminate();
};

exports.help={
    name:"tprog"
};