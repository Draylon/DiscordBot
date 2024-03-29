const { MessageEmbed } = require('discord.js');
const randomColor = require('random-color');
const ProgressBar = require('../utils/Progress');

const alphabet_reactions = require("../utils/alphabet_array");
const menu_buttons = ['✅','❌'];
exports.run = (client, message, args) => {
    const general_filter = (reaction, user) => alphabet_reactions.concat(menu_buttons).includes(reaction.emoji.name);

    message.delete();
    const poll_items = args.join(" ").split("|");
    if(poll_items.length < 2)
        return message.channel.send("Missing Parameters!").then(del_msg=>del_msg.delete({timeout:3000}));
    if(poll_items.length > alphabet_reactions.length+1)
        return message.channel.send("Poll Limit is 26 Topics!").then(del_msg=>del_msg.delete({timeout:3000}));
    
    let pollFinished=false,
    pollCancelled=false;

    var poll_title_s = poll_items[0].trim().split(new RegExp("<|>"));
    for(var iii=1;iii < poll_title_s.length;iii+=2){
        userName=poll_title_s[iii];
        if(userName.length == 20){
            if(userName[1] == '&'){
                const gld = message.guild.roles.cache.get(userName.slice(2));
                if(gld!=undefined)
                    poll_title_s[iii]="@"+gld.name;
                else
                    poll_title_s[iii]="@"+userName.slice(2,-1);
            }else if(userName[1] == '!'){
                const gld = message.guild.members.cache.get(userName.slice(2));
                if(gld!=undefined)
                    poll_title_s[iii]="@"+gld.nickname;
                else
                    poll_title_s[iii]="@"+userName.slice(2,-1);
            }
        }
    }
    let poll_title = poll_title_s.join("");
    

    const embed = new MessageEmbed()
    .setColor(randomColor().hexString())
    .setAuthor('ONGOING POLL')
    .setFooter(`${message.author.id}`)
    //.setURL(`http://aa.com`)
    .setTitle(poll_title+" -  |  0 votes  |");
    poll_items.splice(0,1);
    poll_items.forEach(element => {
        const pbar = ProgressBar({
            incomplete:'_',
            complete: ':',
            head: '#',
            width:55,
            total: 1
        });
        embed.addField(element.trim(),"`  0% "+pbar.bar+"`");
    });

    
    message.channel.send(embed).then(async edit_msg =>{
        await edit_msg.react('✅');
        await edit_msg.react('❌');
        for(var cc=0;cc < poll_items.length;cc++){
            await edit_msg.react(alphabet_reactions[cc]);
        }
    });

};

exports.help = {
    name: 'poll'
};
