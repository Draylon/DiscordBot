
const {MessageEmbed} = require('discord.js');
const ProgressBar = require('../utils/Progress');
const alphabet_reactions = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿'];
const menu_buttons = ['✅','❌'];
const zeroPad = (num, places) => String(num).padStart(places, '0');


module.exports = async (client, reaction, user) => {

    const message = reaction.message;

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
    if(message.channel.id === rolesChannel.id)
        if (['🇦', '🇧', '🇨'].includes(reaction.emoji.name)) {
            switch (reaction.emoji.name) {
                case '🇦':
                    const staffRole = message.guild.roles.cache.get('699581322477174825');
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
        }


    if(message.author.bot){
        //check ongoing polls
        if(message.embeds.length > 0){
            let embed = message.embeds[0];
            if(embed.author){    
                if(embed.author.name == 'ONGOING POLL'){
                    if(alphabet_reactions.concat(menu_buttons).includes(reaction.emoji.name)){
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
                                const field_index = alphabet_reactions.indexOf(reaction.emoji.name);
                            
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
                                const nlen = reaction.count-1;
                                var voteCount = 0;
                                message.reactions.cache.forEach(iter_reaction=>{
                                    if(alphabet_reactions.includes(iter_reaction.emoji.name))
                                        voteCount+=iter_reaction.count-1;
                                });
                                const title = embed.title.split(" |>");
                                embed.setTitle(title[0]+" |>  "+voteCount+" votes  <|");
                                //console.log(`cf: ${field_index} nlen:${nlen} total:${voteCount}`)
                                let pbar = new ProgressBar(':bar',{
                                    curr:nlen,
                                    incomplete:'_',
                                    complete: ':',
                                    head: '#',
                                    width:60,
                                    total: voteCount
                                });
                                pbar.render();
                                embed.fields[field_index].value = `${zeroPad(pbar.prcnt,3)}%` +" `"+pbar.lastDraw+"`";
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
                        message.guild.members.cache.get(embed.footer.text).roles.add(message.guild.roles.cache.get('699581322477174825')).catch(console.error);
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
};