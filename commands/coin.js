const fetch = require("node-fetch");

exports.run = (client, message, args) => {

    message.delete();
    message.channel.send("Flipping coin").then(async msg =>{
        let dataResp = await fetch("https://www.random.org/integers/?num=1&min=0&max=1&col=1&base=10&format=plain&rnd=new")
        .then(async res=>res.text())
        .then(txt =>{
            if(txt == '0')
                msg.edit("Heads!");
            else if(txt == '1')
                msg.edit("Tais!");
            else
                msg.edit("Random Error!!!!!");
        });
    });
    //message.channel.send("Coin Flip coming soon!");

};

exports.help = {
    name: 'coin'
};