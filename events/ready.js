module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);

    const { welcomeChannelName,rolesChannelName } = client.config.defaultSettings;
    const welcomeChannel = client.channels.find(c => c.name === welcomeChannelName);
    const rolesChannel = client.channels.find(c => c.name === rolesChannelName);
    // fetch messages on default channels

    //const fetchedMessages = [welcome,roles_];
    welcomeChannel.fetchMessages({ limit: 1 }).then(collected => {
        if(collected.size <= 0){
            const { RichEmbed } = require('discord.js');
            let embed = new RichEmbed()
                .setAuthor(welcomeChannel.guild.name,welcomeChannel.guild.iconURL)
                .setColor(0x1f3f52)
                .setTitle("Welcome to "+welcomeChannel.guild.name)
                .setDescription(">> click ✅ to verify <<")
                .setImage("https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fsearch%2Fcrab-dancing-gifs&psig=AOvVaw3CTztTLauDs7AyicxNxUmU&ust=1603677941540000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKCtuYPUzuwCFQAAAAAdAAAAABAg");
    
            welcomeChannel.send(embed).then(async msg => {
                await msg.react('✅');
            });
    
    
        }else{
            // update missing reactions ?
        }
    });

    rolesChannel.fetchMessages({ limit: 1 }).then(collected => {
        if(collected.size <= 0){
            const { RichEmbed } = require('discord.js');
            const a = rolesChannel.guild.roles.get('711218719652577381'); // UDESC
            const b = rolesChannel.guild.roles.get('711659664743333949'); // Developer

            const embed = new RichEmbed()
                .setTitle('Available Roles')
                //🇨 ${c.toString()}
                .setDescription(`
            
                Roles avaliable in **${rolesChannel.guild.name}**! You may choose from our list of roles you can join/leave from:

            🇦 ${a.toString()}
            🇧 ${b.toString()}
            
            `)
                .setColor(0xdd9323)
                .setFooter(`Guild ID: ${rolesChannel.guild.id}`);

            rolesChannel.send(embed).then(async msg => {

                await msg.react('🇦');
                await msg.react('🇧');
                //await msg.react('🇨');
            });
    
    
        }else{
            // update missing reactions ?
        }
    });
    
    

    /*fetchedMessages.forEach(c => {
        if(c!= null)
            c.fetchMessages({ limit: 10 }).then(collected => {
                console.log(`Fetched ${collected.size} messages in ${c.name}.`)
                if(collected.size == 0){
                    //create welcome message
                    
                }
            }).catch(console.error);
            
    });*/
};