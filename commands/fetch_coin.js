const fetch = require('node-fetch');
const asciiChart = require('asciichart');
const { MessageEmbed } = require('discord.js');
const alphabet_array = require('../utils/alphabet_array');
const alphabet_obj = require('../utils/alphabet_object');


exports.run = async (client, message, args) => {
    await message.delete().catch(O_o=>{});
    //return message.channel.send("Too few arguments!");
    var coin_name = "",
    image_link = "",
    color = 0x000;
    if(args.length > 0)
        coin_name=[args[0]];

    const filter = (reaction, user) => ['❌','📈','🇦', '🇧', '🇨'].includes(reaction.emoji.name) && user.id === message.author.id;
    if(coin_name == ''){
        const { prefix } = client.config;

        const embed = new MessageEmbed()
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
                createMessage(client,filter,message,coin_name,image_link,color);
            }).catch(collected => {
                msg.delete();
                return message.channel.send(`No coin selected!`).then(msg => msg.delete({timeout:5000}));
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
        createMessage(client,filter,message,coin_name,image_link,color);
    }
    
    
    
};

exports.help = {
    name: 'fetch_coin'
};

async function createMessage(client,filter,message,coin_name,image_link,color){
    var priceHistoryString = await getValuesList(client,coin_name);
    try{
        //message.delete().catch(err=>{});
        message.channel.send("fetching "+coin_name).then(async msg =>{
            let dataResponse = await fetch('https://api.coincap.io/v2/assets/'+coin_name)
            .then(res => res.text())
            .then(json => {
                try {
                    var api_data = JSON.parse(json);
                    let embed = new MessageEmbed()
                    .setTitle(api_data.data.id)
                    .setThumbnail(image_link)
                    .setDescription(`
                    
                        CURRENT PRICE: ${api_data.data.priceUsd}
                        as requested by ${message.author}
                        
                    `)
                    .setColor(color)
                    .setFooter("Press 📈 to generate a graph\nPrice History:\n"+priceHistoryString);
                    client.updateCCValues(api_data.data.id,api_data.data.priceUsd);
                    msg.delete().catch(err=>console.log(err));
                    message.channel.send(embed).then(async msg_createGraph => {
                        await msg_createGraph.react('📈');
                        msg_createGraph.awaitReactions(filter, {
                            max: 1,
                            time: 40000,
                            errors: ['time']
                        }).then(async collected => {
                            const reaction = collected.first();
                            switch (reaction.emoji.name) {
                                case '📈':
                                    msg_createGraph.delete().catch(err=>console.error("Deleting createGraph error! "+err));
                                    var value_list=await buildGraph(client,coin_name,40);
                                    message.channel.send(`${value_list}`).then(async msg_updateGraph=>{
                                        var intv_count=0,
                                        intv_ = setInterval( async ()=>{
                                            intv_count+=1;
                                            if(intv_count>20){
                                                msg_updateGraph.edit("Timed out").then(msg_cutUpdate=>msg_cutUpdate.delete({timeout:3000}));clearInterval(intv_);
                                            }
                                            let dataResponse = await fetch('https://api.coincap.io/v2/assets/'+coin_name)
                                            .then(res => res.text())
                                            .then(async json => {
                                                try {
                                                    api_data = JSON.parse(json);
                                                    client.updateCCValues(api_data.data.id,api_data.data.priceUsd);
                                                    value_list=await buildGraph(client,coin_name,40);
                                                    msg_updateGraph.edit(`${value_list}`);
                                                }catch(err){
                                                    console.error(error);
                                                    msg.delete();
                                                    message.channel.send("Error happened").then(msg =>{msg.delete({timeout:3000});});
                                                }
                                            });
                                        },1000*15);
                                        await msg_updateGraph.react('❌');
                                        msg_updateGraph.awaitReactions(filter, {
                                            max: 1,
                                            time: ((15000*20)+100),
                                            errors: ['time']
                                        }).then(collected => { 
                                            const reaction = collected.first();
                                            switch (reaction.emoji.name) {
                                                case '❌':
                                                    clearInterval(intv_);
                                                    msg_updateGraph.edit("Closing").then(msg_cutUpdate=>msg_cutUpdate.delete({timeout:3000}));
                                                    break;
                                            }
                                        }).catch(collected => {
                                            clearInterval(intv_);
                                            msg_createGraph.reactions.removeAll();
                                            msg_updateGraph.edit("Closing").then(msg_cutUpdate=>msg_cutUpdate.delete({timeout:3000}));
                                                    
                                        });
                                    });
                                    break;
                                default:
                                    msg_createGraph.reactions.removeAll();
                            }
                        }).catch(collected => {
                            //msg_createGraph.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                            embed.setFooter("Price History: \n"+priceHistoryString);
                            msg_createGraph.edit(embed);
                            msg_createGraph.reactions.removeAll();
                        });
                    });
                } catch (error) {
                    console.error(error);
                    msg.delete();
                    message.channel.send("Error happened").then(msg =>{
                        msg.delete({timeout:3000});
                    });
                }
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    }catch(err){
        console.error(err);
    }
}

async function getValuesList(client,coin_name){
    priceHistoryString="";
    priceHistoryList = await client.getCCValues(coin_name);
    priceHistoryList.forEach(data_str => {priceHistoryString+=data_str.price+"\n";});
    return priceHistoryString;
}

async function buildGraph(client,coin_name,limit=10){
    try {
        var old_value_list = await client.getCCValues(coin_name,limit);
        json_list = JSON.stringify(old_value_list),
        parsed_list = JSON.parse(json_list);
        let value_list=Array(parsed_list.length);
        var cc=parsed_list.length-1;
        parsed_list.forEach(item=>{
            try{
                value_list[cc]=parseFloat(item.price);//.toFixed(2));
            }catch(err){
                value_list[cc]=(0);
            }
            cc-=1;
        });
        //console.log(asciiChart.plot(value_list,{height:10}));
        return "Valor atual: "+parseFloat(value_list[value_list.length-1]).toFixed(4)+"\n_*GRAFICO*_\n`"+asciiChart.plot(value_list,{height:10})+"`";
    } catch (error) {
        console.error("Random error occurred");
        console.log(error);
    }
}