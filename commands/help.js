exports.run = (client, message, args) => {

    const specific_command = args.join(' ');
    //message.delete();
    if(specific_command != ''){
        let hlp_prop = require.cache[require.resolve(`./${specific_command}.js`)];
        console.log(hlp_prop.exports.help);
    }else{
        var cmdStrings="";
        client.avaliableCommands().forEach(element => {cmdStrings+=element+"\n";});
        message.channel.send("__Avaliable commands__\n\n"+cmdStrings);//.then(d_msg=>d_msg.delete(25000));
    }

};

exports.help = {
    name: 'help'
};