const path = require('path');
const fs = require('fs');
exports.run = async (client, message, args, settings) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return;

    let setting = args[0];
    let updated = args.slice(1).join(' ');

    switch (setting) {
        case 'shutdown':{
            try{
                await message.channel.send("│>─ Shutting down ─<│");
                process.exit();
            }catch(err){
                message.channel.send("Faliure shutting down!!");
                console.error(err);
            }
            break;
        }
        case 'reload':{
            
            if(updated){
                if(updated == 'all'){
                    
                    try{
                        var filesList = await getAllFiles('');
                        filesList.forEach(cmdName => {
                            delete require.cache[require.resolve(`./${cmdName.toLowerCase()}`)];
                        });
                        client.commands.deleteAll();
                        filesList.forEach(cmdName =>{
                            const pullNewCommand = require(`./${cmdName.toLowerCase()}`);
                            client.commands.set(cmdName.split('.js')[0], pullNewCommand);
                        });
                        message.delete();
                        message.channel.send("All commands reloaded!").then(msg => msg.delete(3000));
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
                    message.channel.send("Command "+updated.toUpperCase()+" Reloaded!");
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
            /**
             * Make sure to do role validation? Need help? Refer to the "welcomeChannel" case statement above!
             */

            break;
        }
        case 'adminRole': {
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
    name: 'config'
};

async function getAllFiles(dirName){
    const directoryPath = path.join(__dirname, dirName);
    //passsing directoryPath and callback function
    let returnList = [];
    let filesList = fs.readdirSync(directoryPath);

    filesList.forEach(item => {
        returnList.push(item);
    });
    return returnList;
}