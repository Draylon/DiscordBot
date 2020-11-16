

const {MessageEmbed} = require('discord.js');
const ProgressBar = require('../utils/Progress');
const alphabet_reactions = require('../utils/alphabet_object');
const menu_buttons = ['✅','❌'];
const {spacePad} = require('../utils/paddings');


module.exports = async (client, reaction, user) => {

    const message = reaction.message;
    const reactionChannel = reaction.channel;

    const member = message.channel.guild.members.cache.get(user.id);
    if (member.user.bot) return;
    
    // ===========================
    
    const rolesChannel = message.guild.channels.cache.get(client.config.defaultSettings.rolesChannelID);

    const a = message.guild.roles.cache.get('699581322477174825');//Staff
    const b = message.guild.roles.cache.get('711218719652577381'); // UDESC
    const c = message.guild.roles.cache.get('711659664743333949'); // Developer

    if(message.channel.id === rolesChannel.id)
        if (['🇦', '🇧', '🇨'].includes(reaction.emoji.name)) {
            switch (reaction.emoji.name) {
                case '🇦':
                    member.roles.remove(a).catch(console.error);
                    break;
                case '🇧':
                    member.roles.remove(b).catch(console.error);
                    break;
                case '🇨':
                    member.removeRole(c).catch(console.error);
                    break;
                default:
                    break;
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
                                    var url_arr=embed.url.slice(8,embed.url.length-5).split('-');
                                    if(url_arr.includes(user.id+"p"+field_index))
                                        url_arr.splice(url_arr.indexOf(user.id+"p"+field_index),1);
                                    //console.log('http://a'+url_arr.join('-')+'a.com');
                                    embed.setURL('http://a'+url_arr.join('-')+'a.com');
                                    //console.log(embed.url);
                                    
                                    var voteCount = 0,
                                    voteIndividual={};
                                    message.reactions.cache.forEach(iter_reaction=>{
                                        if(alphabet_reactions[iter_reaction.emoji.name] != undefined){
                                            voteIndividual[iter_reaction.emoji.name]=iter_reaction.count-1;
                                            voteCount+=iter_reaction.count-1;
                                        }
                                    });
                                    const title = embed.title.split(" |");
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
                                        embed.fields[field_ind].value = "`"+`${spacePad(pbar.percent,3)}%` +" "+pbar.bar+"`";
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
                }
            }
    
        }
};