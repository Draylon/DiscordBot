
exports.run = async (client, message, args, settings) => {

    const adm_role = message.guild.roles.cache.get('699581044621312030');
    const staff_role = message.guild.roles.cache.get('699581322477174825');

    
    if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`You must be ${staff_role.toString()} for that`).then(msg=>msg.delete({timeout:3000}));

    let setting = args[0];
    let updated = args.slice(1).join(' ');

    switch (setting) {
        case 'shutdown':{
            try{
                message.delete();
                await message.channel.send("│>─ Shutting down ─<│").then(msg => msg.delete({timeout:3000}));
                process.exit();
            }catch(err){
                message.channel.send("Failure shutting down!!");
                console.error(err);
            }
            break;
        }
        case 'reload':{
            
            if(updated){
                if(updated == 'all'){
                    
                    try{
                        var filesList = await client.avaliableCommands();
                        filesList.forEach(cmdName => {
                            delete require.cache[require.resolve(`./${cmdName.toLowerCase()}.js`)];
                        });
                        client.commands.clear();
                        filesList.forEach(cmdName =>{
                            const pullNewCommand = require(`./${cmdName.toLowerCase()}.js`);
                            client.commands.set(cmdName, pullNewCommand);
                        });
                        message.delete();
                        message.channel.send("All commands reloaded!").then(msg => msg.delete({timeout:3000}));
                        console.clear();
                    }catch(err){
                        message.channel.send("Error occurred: "+err);
                        console.log(err);
                    }
                }else{
                    try {
                        updated = updated.toLowerCase();
                        delete require.cache[require.resolve(`./${updated}.js`)];
                        client.commands.delete(updated);
                        const pullNewCommand = require(`./${updated}.js`);
                        client.commands.set(updated, pullNewCommand);
                    } catch (error) {
                        return message.channel.send("Error reloading "+updated.toUpperCase()+"!!!");
                    }
                    message.delete();
                    message.channel.send("Command "+updated.toUpperCase()+" Reloaded!").then(msg => msg.delete({timeout:3000}));;
                }
            }
            break;
        }
        case 'prefix': {
            if (updated) {
                try {
                    await client.updateGuild(message.guild, { prefix: updated });
                    return message.channel.send(`Prefix has been updated to: \`${updated}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`An error occurred: **${error.message}**`);
                }
            }

            message.channel.send(`Current prefix: \`${settings.prefix}\``);
            break;
        }
        case 'welcomeChannel': {
            /**
             * Channel validation. Check if the mentioned channel is a guild.
             * Want a hint? 
             * ```js
             * let channel = message.mentions.channels.find(c => c.name === updated);
             * 
             * // example of Collection#find (look below)
             * collection.find(val => val.username === 'Anthony');
             * ```
             * Remember when I talked about collections earlier in the video!
             * https://discord.js.org/#/docs/main/stable/class/Collection?scrollTo=find
             * https://anidiots.guide/understanding/collections
             */

            break;
        }
        case 'welcomeMsg': {
            /**
             * Make sure the user specifically defines the {{user}} and {{guild}} parameters.
             * Want a hint?
             * ```js
             * let foo = '{{bar}}';
             * let message = 'Hello, {bar}';
             * 
             * if (foo.test(message)) {
             *  console.log('Wooo');
             * } else {
             *  console.log('No...');
             * }
             * ```
             */

            break;
        }
        case 'modRole': {
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You must be ${adm_role.toString()} for that`).then(msg=>msg.delete({timeout:3000}));
            /**
             * Make sure to do role validation? Need help? Refer to the "welcomeChannel" case statement above!
             */

            break;
        }
        case 'adminRole': {
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You must be ${adm_role.toString()} for that`).then(msg=>msg.delete({timeout:3000}));
            /**
             * Make sure to do role validation? Need help? Refer to the "welcomeChannel" case statement above!
             */
            
            break;
        }
        default: {
            /**
             * Want to go further? Use object destructuring to get the different properties from the MongoDB document
             * and display them in the message below!
             * 
             * Object desctructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
             */

            message.channel.send(`Default settings: PLACEHOLDER`);
            break;
        }
    }
};

exports.help = {
    name: 'config',
    description: 'Options for tweaking the bot'
};
