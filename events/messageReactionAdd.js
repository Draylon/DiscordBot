
const {MessageEmbed} = require('discord.js');
const ProgressBar = require('../utils/Progress');
const alphabet_reactions = require('../utils/alphabet_object');
const alphabet_array = require('../utils/alphabet_array');
const {timezones_by_list,timezones_by_letter} = require('../utils/timezones')
const menu_buttons = ['✅','❌'];
const zeroPad = require('../utils/zeropad');


module.exports = async (client, reaction, user) => {

    const message = reaction.message;

    if(message.channel.guild){
        const member = message.channel.guild.members.cache.get(user.id);

        if (member.user.bot) return;
        
        // ===========================
        
        const welcomeChannel = message.guild.channels.cache.get(client.config.defaultSettings.welcomeChannelID);
        const rolesChannel = message.guild.channels.cache.get(client.config.defaultSettings.rolesChannelID);


        // ==============================================
        // ==============================================
        // ==============================================

        // WELCOME VERIFICATION
        // Verify a member once they have reacted to the message in the verify channel (gives them the Verified role)
        if(message.channel.id === welcomeChannel.id)
            if (reaction.emoji.name === '✅') {
                member.roles.add(message.guild.roles.cache.get('699580541577461801')).catch(console.error);
                return reaction.users.remove(user.id).catch(console.error);
            }
        

        // AVALIABLE ROLES
        // Adds/removes a user from a joinable role via the welcome
        if(message.channel.id === rolesChannel.id){
            if(message.embeds.length > 0){
                if (alphabet_array.slice(0,3).includes(reaction.emoji.name) && message.embeds[0].footer.text == 'Guild Role Selector') {
                    switch (reaction.emoji.name) {
                        case '🇦':
                            const staffRole = message.guild.roles.cache.get('699581322477174825');
                            const staffApply = message.guild.roles.cache.get('777497759154569246');
                            if(member.roles.has('699581322477174825') || member.roles.has('777497759154569246'))
                                return reaction.users.remove(user.id).catch(console.error);
                            member.roles.add(staffApply);
                            let embedd = new MessageEmbed()
                            .setAuthor('STAFF APPLIANCE')
                            .setDescription(`${user} has applied for ${staffRole}`)
                            .setFooter(user.id)
                            message.guild.channels.cache.get(client.config.defaultSettings.configsChannelID).send(embedd).then(async msg_rct=>{
                                await msg_rct.react('✅');
                            });
                            //APPLY STAFF REQUEST
                            break;
                        case '🇧':
                            member.roles.add(message.guild.roles.cache.get('711218719652577381')).catch(console.error);
                            // UDESC
                            break;
                        case '🇨':
                            member.roles.add(message.guild.roles.cache.get('711659664743333949')).catch(console.error);
                            // Developer
                            break;
                        default:
                            break;
                    }
                    return;
                    
                
                }else if (alphabet_array.slice(0,7).includes(reaction.emoji.name) && message.embeds[0].footer.text == 'Guild Timezone Selector') {
                    let zone_list = timezones_by_list[timezones_by_letter[reaction.emoji.name]],
                    date_text="",
                    zone_index=0;
                    zone_list.forEach(delay => {
                        const d = new Date(Date.now() + delay*3600000);
                        const am_pm = 'am';
                        if(d.getUTCHours() >= 12)
                            am_pm='pm';

                        date_text+= alphabet_array[zone_index] + "   "+zeroPad(d.getUTCHours(),2)+" : "+zeroPad(d.getUTCMinutes(),2)+" "+am_pm+"\n";
                        zone_index++;
                    });

                    const filter = (reaction) => alphabet_array.slice(0,7).includes(reaction.emoji.name);
        
                    const embed2 = new MessageEmbed()
                    .setTitle("Select the current Time:")
                    .setDescription(`
        
                    ${date_text}
        
                    `)
                    .setColor(0xdd9323)
                    .setFooter("Expires within 60 seconds");
                    
                    user.send(embed2).then(async msg_r => {
                        for(var vc1=0;vc1 < zone_list.length;vc1++){
                            await msg_r.react(alphabet_array[vc1]);
                        }
                        
                        msg_r.awaitReactions(filter,{
                            max: 1,
                            time: 60000,
                            errors:['time']
                        }).then(coll=>{
                            let thisReaction = coll.first();
                            let zone_sel=zone_list[alphabet_reactions[thisReaction.emoji.name]];
                            client.updateProfile(user,{tz_offset:zone_sel});
                            embed2.setFooter("If incorrect, contact server admin")
                            .setTitle("Selected: "+zone_sel)
                            .setDescription("");
                            msg_r.delete();
                            msg_r.channel.send(embed2);
                        }).catch(e=>{
                            embed2.setFooter("")
                            .setTitle("Expired, please assign again in the server!")
                            .setDescription("");
                            msg_r.delete();
                            msg_r.channel.send(embed2);
                        });
                        
                    });
                }
            }
        }


        if(message.author.bot){
            //check ongoing polls
            if(message.embeds.length > 0){
                let embed = message.embeds[0];
                if(embed.author){
                    if(embed.author.name == 'ONGOING POLL'){
                        if(Object.keys(alphabet_reactions).concat(menu_buttons).includes(reaction.emoji.name)){
                            let cancelled=false;
                            switch(reaction.emoji.name){
                                case '✅':
                                    if(user.id == embed.footer.text){
                                        message.reactions.removeAll();
                                        embed.author.name = 'POLL CONCLUDED!';
                                        const title = embed.title.split(" |>");
                                        embed.setTitle(title[0]);
                                        embed.setFooter("");
                                        embed.setURL("");
                                        embed.fields.forEach(field=>{
                                            field.name = field.name + " ended in "+parseInt(field.value.slice(0,3)).toString()+"%";
                                            field.value = "────────────────────────";
                                        });

                                    }else
                                        reaction.users.remove(user);
                                break;
                                case '❌':
                                    if(user.id == embed.footer.text){
                                        message.reactions.removeAll();
                                        embed.author.name = 'POLL CANCELLED!';
                                        embed.fields=[];
                                        embed.setTitle("");
                                        embed.setFooter("");
                                        embed.setURL("");
                                        cancelled=true;
                                    }else
                                        reaction.users.remove(user);
                                break;
                                default:
                                    const field_index = alphabet_reactions[reaction.emoji.name];
                                
                                    var url_st = embed.url.slice(8,embed.url.length-5),
                                    url_names = url_st.split('-');
                                    let breakk=false;
                                    for(var ccp1=0;ccp1<url_names.length;ccp1++){
                                        if(url_names[ccp1].split('p')[0] == user.id){
                                            breakk=true;
                                            break;
                                        }
                                    }
                                    if(breakk){
                                        reaction.users.remove(user);
                                        break;
                                    }

                                    url_names.push(user.id+"p"+field_index);
                                    embed.setURL('http://a'+url_names.join('-')+'a.com');
                                    //console.log(embed.url);
                                    var voteCount = 0,
                                    voteIndividual={};
                                    message.reactions.cache.forEach(iter_reaction=>{
                                        if(alphabet_reactions[iter_reaction.emoji.name] != undefined){
                                            voteIndividual[iter_reaction.emoji.name]=iter_reaction.count-1;
                                            voteCount+=iter_reaction.count-1;
                                        }
                                    });
                                    const title = embed.title.split(" |>");
                                    embed.setTitle(title[0]+" |>  "+voteCount+" votes  <|");
                                    //console.log(`cf: ${field_index} nlen:${nlen} total:${voteCount}`)
                                    Object.entries(voteIndividual).forEach(entry =>{
                                        const field_ind = alphabet_reactions[entry[0]];
                                        const pbar = ProgressBar({
                                            curr:entry[1],
                                            incomplete:'_',
                                            complete: ':',
                                            head: '#',
                                            width:55,
                                            total: Math.max(voteCount,1)
                                        });
                                        embed.fields[field_ind].value = `${zeroPad(pbar.percent,3)}%` +" `"+pbar.bar+"`";
                                    });
                            }
                            message.edit(embed).then(msg_d=>{
                                if(cancelled)
                                    msg_d.delete({timeout:5000});
                            });
                            
                        }else{
                            reaction.remove();
                        }
                    }
                    else if(embed.author.name == 'STAFF APPLIANCE'){
                        if(['✅'].includes(reaction.emoji.name)){
                            let member = message.guild.members.cache.get(embed.footer.text);
                            member.roles.remove(message.guild.roles.cache.get('777497759154569246')).catch(console.error);
                            member.roles.add(message.guild.roles.cache.get('699581322477174825')).catch(console.error);
                            embed.setAuthor('STAFF ACCEPTED!');
                            embed.setTitle("New Staff member:");
                            embed.setDescription(message.guild.members.cache.get(embed.footer.text));
                            embed.setFooter("");
                            message.edit(embed);
                            message.reactions.removeAll();
                        }
                    }
                }
            }

        }
        // BITCOIN_MENU
        /*if(['🇦', '🇧', '🇨'].includes(reaction.emoji.name)){
            
        }*/
    }else{
        // DM Channel reactions with permanent characteristics
    }
};