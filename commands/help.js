exports.run = (client, message, args) => {

    const specific_command = args.join(' ');
    //message.delete();
    if(specific_command != ''){
        // search something specific
    }else{
        var cmdStrings="";
        client.avaliableCommands().forEach(element => {cmdStrings+=element+"\n";});
        message.channel.send("__Avaliable commands__\n\n"+cmdStrings);//.then(d_msg=>d_msg.delete(25000));
    }

};

exports.help = {
    name: 'help'
};