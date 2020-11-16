
const {DateParser} = require('../utils');
const {spacePad} = require('../utils/paddings');
const {MessageEmbed} = require('discord.js');
const randomColor = require('random-color');

exports.run = async (client, message, args) => {
    message.delete();
    if(args.length < 1)
    return message.channel.send("Insuficient parameters!!").then(msg =>msg.delete({timeout:4000}));
    var user_list = [],
    role_list = [],
    user_l_sflk=[],
    role_l_sflk=[];
    var iter_1 = args.join(' ').split(',');
    let date='',topic='';
    
    for(var citer1=0;citer1<iter_1.length;citer1++){
        userName = iter_1[citer1].trim();
        if(citer1==iter_1.length-1){
            var user_dt_spl = userName.split(" ");
            userName=user_dt_spl[0].trim();
            var date_topic = user_dt_spl.slice(1).join(" ").trim().split("|");
            date=date_topic[0];
            topic=date_topic[1];
        }
        if(userName == 'me'){
            user_list.push(message.author);
            user_l_sflk.push(message.author.id);
        }else{
            if(userName.length == 22){
                if(userName[2] == '&'){
                    const gld = message.guild.roles.cache.get(userName.slice(3,-1));
                    role_list.push(gld);
                    role_l_sflk.push(userName.slice(3,-1));
                }else if(userName[2] == '!'){
                    const gld = message.guild.members.cache.get(userName.slice(3,-1));
                    user_list.push(gld);
                    user_l_sflk.push(userName.slice(3,-1));
                }
            }else if(userName.length == 21){
                const gld = message.guild.members.cache.get(userName.slice(2,-1));
                user_list.push(gld);
                user_l_sflk.push(userName.slice(2,-1));
            }
        }
    }
    let user_mention_list = [],role_mention_list=[];
    user_list.forEach(ul_item=>{
        user_mention_list.push(ul_item.toString());
    });
    role_list.forEach(rl_item=>{
        role_mention_list.push(rl_item.toString());
    });
    
    const cancelling_filter = (reaction, user) => ['❌'].includes(reaction.emoji.name) && user.id === message.author.id;
    
    const utc_delay = await client.getProfile(message.author).tz_offset;

    let ms = DateParser(date,Date.now(),utc_delay);
    if((ms-Date.now()) > 0){
        let createdReminder = await client.createReminder({
            users:user_mention_list,
            roles:role_mention_list,
            users_snowFlake: user_l_sflk,
            roles_snowFlake: role_l_sflk,
            date:ms,
            topic:topic,
            channelID:message.channel.id,
            guildID:message.guild.id
        });
        let timeout = client.runReminder(createdReminder);
        let d=new Date(ms-10800000);
        let am='am',dHour=d.getUTCHours();
        if(dHour >= 12)
            am='pm';
            if(dHour > 12)
                dHour-=12;
        
        let descText = "Reminder for ";
        user_list.forEach(ul_item=>{
            descText+= ul_item.toString()+' ';
        });
        if(user_list.length == 0)
            descText+= ' everyone in ';
        else 
            if(role_list.length > 0)
                descText+=' and everyone in ';
        role_list.forEach(ul_item=>{
            descText+= ul_item.toString()+' ';
        });
        
        
        let embed = new MessageEmbed()
            .setTitle("Reminder Created!")
            .setDescription(`${descText}`)
            .setColor(randomColor().hexString())
            .addField("Date",`${spacePad(d.getUTCDate(),2)}/${spacePad(d.getUTCMonth()+1,2)}/${d.getUTCFullYear()} at ${spacePad(dHour,2)}:${spacePad(d.getUTCMinutes(),2)}:${spacePad(d.getUTCSeconds(),2)} ${am}`)
            .addField("Remind: ",topic)
            .setFooter(`${createdReminder._id}`);
        message.channel.send(embed).then(async msg_react=>{
            await msg_react.react('❌');
            msg_react.awaitReactions(cancelling_filter,{
                max: 1,
                time: Math.min(15000,Math.max((ms-Date.now()-2000),0)),
                errors: ['time']
            }).then(async collected=>{
                msg_react.reactions.removeAll();
                var count = await client.deleteReminder(createdReminder._id,timeout);
                if(count){
                    embed.setTitle("Reminder Deleted!");
                    embed.fields=[];
                    embed.setFooter("");
                    embed.setDescription("");
                }else{
                    embed.setTitle("ERROR!");
                    embed.fields=[];
                    embed.setFooter("");
                    embed.setDescription("");
                }
                msg_react.edit(embed).then(msg_d2=>msg_d2.delete({timeout:4000}).catch(e=>console.log));
            }).catch(collected=>{
                try{
                    msg_react.reactions.removeAll();
                    msg_react.delete();
                }catch(e){
                    console.log(e);
                }
            });
        });
    }else{
        message.channel.send("Cannot remind in the past!!").then(msg_d=>msg_d.delete({timeout:3000}));
    }
};
exports.help = {
    name: 'remind'
};