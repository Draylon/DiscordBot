
const ProgressBar = require('../utils/Progress');


exports.run = async( client,message,args) => {
    console.log(args);
    var pbar = new ProgressBar(':bar',{
        curr:args[0],
        incomplete:'_',
        complete: ':',
        head: '#',
        width:55,
        total: Math.max(args[1],1)
    });
    pbar.render();
    console.log(pbar.lastDraw+" "+pbar.prcnt);
    console.log(pbar.curr+" "+pbar.total);
    message.delete();
    message.channel.send("Percent: "+pbar.prcnt+" `"+pbar.lastDraw+"`");
    pbar.terminate();
};

exports.help={
    name:"tprog"
};