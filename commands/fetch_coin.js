const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    var coin_name = args.join(' '),
    image_link = "",
    color = 0x000;
    const filter = (reaction, user) => ['📈','🇦', '🇧', '🇨'].includes(reaction.emoji.name) && user.id === message.author.id;
    await message.delete().catch(O_o=>{});
    if(coin_name == ''){
        const { prefix } = client.config;

        const a = message.guild.roles.get('699580541577461801'); // Verified
        const b = message.guild.roles.get('711218719652577381'); // UDESC
        const c = message.guild.roles.get('711659664743333949'); // Developer

        const embed = new RichEmbed()
            .setTitle('Avalilable Coins')
            .setDescription(`
            
            🇦 BITCOIN
            🇧 ETHEREUM
            🇨 TETHER

            `)
            .setColor(0xdd9323)
            .setFooter(`|      SELECT A COIN TO START      |`);
            
        message.channel.send(embed).then(async msg => {

            await msg.react('🇦');
            await msg.react('🇧');
            await msg.react('🇨');

            msg.awaitReactions(filter, {
                max: 1,
                time: 10000,
                errors: ['time']
            }).then(collected => {

                const reaction = collected.first();

                switch (reaction.emoji.name) {
                    case '🇦':
                        coin_name = "bitcoin";
                        image_link="https://cdn.pixabay.com/photo/2018/02/02/13/51/bitcoin-3125488_960_720.png";
                        color=0xbe8b19;
                        break;
                    case '🇧':
                        coin_name = "ethereum";
                        image_link="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png";
                        color = 0x626890;
                        break;
                    case '🇨':
                        coin_name = "tether";
                        image_link="https://guiadobitcoin.com.br/wp-content/uploads/2020/06/tether-logo-png-transparent.png";
                        color=0x229a77;
                        break;
                    default: 
                        coin_name="bitcoin";
                        image_link="https://cdn.pixabay.com/photo/2018/02/02/13/51/bitcoin-3125488_960_720.png";
                        color=0xbe8b19;
                }
                msg.delete().catch(err=>console.log(err));
                //PRA FRENTE DAQUI
                createMessage(filter,message,coin_name,image_link,color);
            }).catch(collected => {
                msg.delete();
                return message.channel.send(`No coin selected!`).then(msg => msg.delete(5000));
            });
        });
    }else{
        switch (coin_name) {
            case 'bitcoin':
                image_link="https://cdn.pixabay.com/photo/2018/02/02/13/51/bitcoin-3125488_960_720.png";
                color=0xbe8b19;
                break;
            case 'ethereum':
                image_link="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png";
                color = 0x626890;
                break;
            case 'tether':
                image_link="https://guiadobitcoin.com.br/wp-content/uploads/2020/06/tether-logo-png-transparent.png";
                color=0x229a77;
                break;
            default: 
                image_link="";
                color=0x999;
        }
        createMessage(filter,message,coin_name,image_link,color);
    }
    
    
    
};

exports.help = {
    name: 'fetch_coin'
};

async function createMessage(filter,message,coin_name,image_link,color){
    
    try{
        //message.delete().catch(err=>{});
        message.channel.send("fetching "+coin_name).then(async msg =>{
            let dataResponse = await fetch('https://api.coincap.io/v2/assets/'+coin_name)
            .then(res => res.text())
            .then(json => {
                try {
                    var api_data = JSON.parse(json);
                    let embed = new RichEmbed()
                    .setTitle(api_data.data.id)
                    .setThumbnail(image_link)
                    .setDescription(`
                    
                        CURRENT PRICE: ${api_data.data.priceUsd}
                        as requested by ${message.author}
                        
                    `)
                    .setColor(color)
                    .setFooter("Press 📈 to generate a graph\nPrice History: (wip - precisa do mongodb)");
                    msg.delete().catch(err=>console.log(err));
                    message.channel.send(embed).then(async msg_createGraph => {
                        await msg_createGraph.react('📈');
                        msg_createGraph.awaitReactions(filter, {
                            max: 1,
                            time: 10000,
                            errors: ['time']
                        }).then(collected => {
                            const reaction = collected.first();
                            switch (reaction.emoji.name) {
                                case '📈':
                                    msg_createGraph.delete().catch(err=>console.error("Deleting createGraph error! "+err));
                                    message.channel.send("Fazer algo mais bem elaborado aqui\nListando os valores a cada 20 segundos:").then(async msg_updateGraph=>{
                                        var priceList = "",
                                        intv_count=0,
                                        intv_ = setInterval( async ()=>{
                                            intv_count+=1;
                                            let dataResponse = await fetch('https://api.coincap.io/v2/assets/'+coin_name)
                                            .then(res => res.text())
                                            .then(json => {
                                                try {
                                                    api_data = JSON.parse(json);
                                                    priceList+=api_data.data.priceUsd+"\n";
                                                    msg_updateGraph.edit("----Valor----\n"+priceList);
                                                }catch(err){
                                                    console.error(error);
                                                    msg.delete();
                                                    message.channel.send("Error happened").then(msg =>{msg.delete(3000);});
                                                }
                                                if(intv_count>5){
                                                    msg_updateGraph.edit("Stop printing").then(msg_cutUpdate=>msg_cutUpdate.delete(3000));clearInterval(intv_);}
                                            });
                                        },1000*20);
                                    });
                                    break;
                                default:
                                    msg_createGraph.reactions.forEach(react=>react.removeAll());
                            }
                        }).catch(collected => {
                            //msg_createGraph.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                            embed.setFooter("Price History: (wip - precisa do mongodb)");
                            msg_createGraph.edit(embed);
                            msg_createGraph.reactions.forEach(react=>react.removeAll());
                        });
                    });
                } catch (error) {
                    console.error(error);
                    msg.delete();
                    message.channel.send("Error happened").then(msg =>{
                        msg.delete(3000);
                    });
                }
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    }catch(err){
        console.error(err);
    }
}
