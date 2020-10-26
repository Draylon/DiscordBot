const fetch = require('node-fetch');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {

    var coin_name = args.join(' '),
    image_link = "",
    color = 0x000;
    if(coin_name == ''){
        const { prefix } = client.config;

        await message.delete().catch(O_o=>{});

        const a = message.guild.roles.get('699580541577461801'); // Verified
        const b = message.guild.roles.get('711218719652577381'); // UDESC
        const c = message.guild.roles.get('711659664743333949'); // Developer

        const filter = (reaction, user) => ['🇦', '🇧', '🇨'].includes(reaction.emoji.name) && user.id === message.author.id;

        const embed = new RichEmbed()
            .setTitle('Avaiilable Coins')
            .setDescription(`
            
            🇦 BITCOIN
            🇧 ETHEREUM
            🇨 TETHER

            `)
            .setColor(0xdd9323)
            .setFooter(`ID: ${message.author.id}`);
            
        message.channel.send(embed).then(async msg => {

            await msg.react('🇦');
            await msg.react('🇧');
            await msg.react('🇨');

            msg.awaitReactions(filter, {
                max: 1,
                time: 30000,
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
                msg.delete();
                createMessage(message,coin_name,image_link,color);
            }).catch(collected => {
                return message.channel.send(`NO COIN SELECTED`).then(msg => msg.delete(3000));
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
                image_link="https://cdn.pixabay.com/photo/2018/02/02/13/51/bitcoin-3125488_960_720.png";
                color=0xbe8b19;
        }
        createMessage(message,coin_name,image_link,color);
    }
    
    
    
};

exports.help = {
    name: 'fetch_coin'
};

async function createMessage(message,coin_name,image_link,color){
    message.delete();
    message.channel.send("fetching "+coin_name).then(async msg =>{
        let dataResponse = await fetch('https://api.coincap.io/v2/assets/'+coin_name)
        .then(res => res.text())
        .then(json => {
            try {
                api_data = JSON.parse(json);
                let embed = new RichEmbed()
                .setTitle(api_data.data.id)
                .setThumbnail(image_link)
                .setDescription(`
                
                      CURRENT PRICE: ${api_data.data.priceUsd}
                      as requested by ${message.author}
                      
                `)
                .setColor(color)
                .setFooter("Price History: (wip - precisa do mongodb)");
                msg.delete();
                message.channel.send(embed);
            } catch (error) {
                console.error(error);
                msg.delete();
                message.channel.send("Error happened").then(msg =>{
                    msg.delete(3000);
                });
            }
        });
    });
}