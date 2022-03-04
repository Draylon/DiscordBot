// òûûø×ƒááíó»ªº¿®¬½¼¡«»░▒▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┐┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÐÊËÈıÍÎÏ┘┌┌█▄¦
// ¨·¹2³²¶¶■ ☺‼☻+,♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨§6,↑ 
const alphabet_reactions = require('../utils/alphabet_object');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { Cc_value,Cryptocurrency,Guild, Profile,Reminder } = require('../models');

const { MessageEmbed } = require('discord.js');
const randomColor = require('random-color');

module.exports = client => {
    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return client.config.defaultSettings;
    };
    client.guildExists = async guildId => {
        if(await Guild.findOne({guildID:guildId}))
            return true;
        return false;
    };

    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }

        console.log(`Guild "${data.guildName}" updated settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    client.createGuild = async settings => {
        const defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, client.config.defaultSettings);
        const merged = Object.assign(defaults, settings);

        const newGuild = await new Guild(merged);
        return newGuild.save()
            .then(console.log(`Default settings saved for guild "${merged.guildName}" (${merged.guildID})`));
    };


    client.createProfile = async profile => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, profile);
        const newProfile = await new Profile(merged);
        return newProfile.save()
            .then(console.log(`New profile saved for user "${merged.username}" (${merged.userID})`));
    };
    client.profileExists = async userID => {
        if(await Profile.findOne({userID:userID})){
            return true;
        }
        return false;
    };
    client.getProfile = async user => {
        const data = await Profile.findOne({ userID: user.id });
        if (data){
             return data;
        }else{
            console.log("USER "+user.id+" not added!!");
            return;
        }
    };
    client.getProfileCount = async()=>{
        return await Profile.estimatedDocumentCount();
    };
    client.getNewestJoinedDate = async ()=>{
        const data = await Profile.find().sort({joinDate:'desc'}).limit(1);
        if(data)
            return data.joinDate;
        return -1;
    };

    client.updateProfile = async (user, data) => {
        let profile = await client.getProfile(user);

        if (typeof profile !== 'object') profile = {};
        for (const key in data) {
            if (profile[key] !== data[key]) profile[key] = data[key];
            else return;
        }

        //console.log(`Profile "${profile.username}" (${profile.userID}) updated: ${Object.keys(data)}`);
        return await profile.updateOne(profile); 
    };



    client.clean = text => {
        if (typeof(text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };

    client.avaliableCommands = () => {
        const directoryPath = path.join(__dirname, '../commands');
        //passsing directoryPath and callback function
        let returnList = [];
        let filesList = fs.readdirSync(directoryPath);

        filesList.forEach(item => {
            if(item[0] != '_')
                returnList.push(item.split(".js")[0]);
        });
        return returnList;
    };


    // ====  WELCOME_INITIALIZER ===
    client.welcomeInitialize = channel => {
        let embed = new MessageEmbed()
            .setAuthor(channel.guild.name,channel.guild.iconURL)
            .setColor(0x1f3f52)
            .setTitle("Welcome to "+channel.guild.name)
            .setDescription(
                "`"+
                "▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n"+
                "⡎╔═════════════════════════════════╗⢱\n"+
                "⡇║┌───────────────────────────────┐║⢸\n"+
                "⡃╚╝          Reagir com           ╚╝⢘\n"+
                "⠀        >>      ✅      <<        \n"+
                "⡅╔╗         Para Entrar.          ╔╗⢨\n"+
                "⡇║└───────────────────────────────┘║⢸\n"+
                "⢇╚═════════════════════════════════╝⡸\n"+
                "──────────────────────────────────"+
                "`"
            )
            /* .setDescription("`"+
                "╔══════════════════════════════╗\n"+
                "║                              ║\n"+
                "╠  >>  click ✅ to verify  <<  ╣\n"+
                "║                              ║\n"+
                "╚══════════════════════════════╝`") */
            .setImage("https://media.tenor.com/images/d0c157935d6144d45c48d5a3053ab118/tenor.gif");

        channel.send(embed).then(async msg => {
            await msg.react('✅');
        });
    };
    client.rolesInitialize = channel => {
        const a = channel.guild.roles.cache.get('699581322477174825'); // Staff
        const b = channel.guild.roles.cache.get('711218719652577381'); // UDESC
        const c = channel.guild.roles.cache.get('711659664743333949'); // Developer

        const embed1 = new MessageEmbed()
            .setTitle('Available Roles')
            .setColor(0x1f3f52)
            //🇨 ${c.toString()}
            .setDescription(`
        
            Roles avaliable in **${channel.guild.name}**! You may choose from our list of roles you can join/leave from:

        🇦 ${a.toString()}
        🇧 ${b.toString()}
        🇨 ${c.toString()}
        
        `)
            .setColor(0xdd9323)
            .setFooter(`Guild Role Selector`);
            //.setFooter(`Guild ID: ${channel.guild.id}`);

        channel.send(embed1).then(async msg => {

            await msg.react('🇦');
            await msg.react('🇧');
            await msg.react('🇨');
        });

        // ==================================
        

        const embed2 = new MessageEmbed()
            .setTitle('Time Zones')
            .setColor(0x1f3f52)
            //🇨 ${c.toString()}
            .setDescription(`
        
            Select your region:

        🇦     :earth_americas:     North America
        🇧     :earth_africa:     Africa
        🇨     :earth_asia:     Asia
        🇩     :earth_americas:     South America
        🇪     :earth_asia:     Oceania
        🇫     :earth_americas:     Antarctica
        🇬     :earth_asia:     Europe

        You will receive a DM with the exact timezone to select.
        
        `)
        .setColor(0xdd9323)
        .setFooter("Guild Timezone Selector");

        channel.send(embed2).then(async msg => {

            await msg.react('🇦');
            await msg.react('🇧');
            await msg.react('🇨');
            await msg.react('🇩');
            await msg.react('🇪');
            await msg.react('🇫');
            await msg.react('🇬');
        });
        
    };

    // ====  DATABASE ====

    client.updateDatabase = async () => {
        try{
            await client.guilds.cache.forEach(guild=>{
                if(!client.guildExists(guild.id)){
                    console.log("guild "+guild.name+" is new!");
                    client.createGuild({
                        guildID: guild.id,
                        guildName: guild.name,
                        ownerID: guild.ownerID,
                        ownerUsername: guild.owner.user.tag
                    });
                }
                guild.members.fetch({force:true}).then( async list => {
                    let newest_in_guild=0,lstc=0;
                    list.forEach(async member=>{
                        if(member.user.bot)
                            list.delete(member);
                        else
                            if(member.joinedAt.getTime() > newest_in_guild)
                                newest_in_guild=member.joinedAt.getTime();
                        lstc++;
                    });
            // two methods to check if there is 'new' user
            // db sizes differ  |  latest guild user join date > latest mongo user join date
                    let db_changed = false;
                    if(list.size > client.getProfileCount())
                        db_changed=true;
                    else if(newest_in_guild > await client.getNewestJoinedDate()){
                        db_changed=true;
                    }
                    if(db_changed){
                        list.forEach(async membed=>{
                            const userExists = await client.profileExists(member.user.id);
                            if(!userExists){
                                console.log("user "+member.user.tag+" is new!");
                                client.createProfile({
                                    guildID: member.guild.id,
                                    guildName: member.guild.name,
                                    userID: member.id,
                                    username: member.user.tag,
                                    joinDate: Date.now()});
                            }
                        });
                    }else{
                        console.log("No new users :(");
                    }
                });
            });
            console.log("DB updated!");
            return true;
        }catch(e){
            return false;
        }
    };

    // ====  CRYPTOCURRENCY  =====

    client.createCryptocurrency = async profile => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, profile);

        const newProfile = await new Cryptocurrency(merged);
        return newProfile.save().then(console.log(`New cryptocurrency saved: ${profile.coinID}`));
    };

    client.getCryptocurrency = async name =>{
        const data = await Cryptocurrency.findOne({ coinID: name });
        if (data) return data;
        else return;
    };
    client.updateCryptocurrency = async (name,data) =>{
        let currency = await client.getProfile(user);
        if (typeof currency !== 'object') currency = {};
        for (const key in data) {
            if (currency[key] !== data[key]) currency[key] = data[key];
            else return;
        }

        //console.log(`Profile "${profile.username}" (${profile.userID}) updated: ${Object.keys(data)}`);
        return await Profile.updateOne(currency);
    }

    client.getCCValues = async (coin_name,limit=10)=>{
        const curr = await client.getCryptocurrency(coin_name);
        if(curr){
            const data = await Cc_value.find({ "ref_id": curr._id }).sort({_date:'desc'}).limit(limit);
            if (data) return data;
        }
        return ['no previous values found for '+coin_name];
    };
    client.updateCCValues= async (coin_name,newValue)=>{
        var coinProfile = await client.getCryptocurrency(coin_name);
        if (!coinProfile) coinProfile = await client.createCryptocurrency({coinID:coin_name});
        await new Cc_value({_date:Date.now(),ref_id:coinProfile._id,price:newValue}).save();
    };


    // ============================
    // =====   REMINDER    ========

    client.createReminder = async reminder => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, reminder);

        const newProfile = await new Reminder(merged);
        return newProfile.save();
    };
    client.runReminder = async reminder => {
        return setTimeout(async function(){
            var guild = client.guilds.cache.get(reminder.guildID);
            var channel = guild.channels.cache.get(reminder.channelID);
            var embed = new MessageEmbed()
            .setColor(randomColor().toString())
            .setTitle("Reminder DUE!")
            .setDescription(`${reminder.users} ${reminder.roles}`)
            .addField(reminder.topic,'────────────────────────');
            channel.send({embed:embed,content:`${reminder.users} ${reminder.roles}`,allowedMentions:{users:reminder.users_snowFlake,roles:reminder.roles_snowFlake}});
            await client.deleteReminder(reminder._id);
        },reminder.date - Date.now());
    };
    client.deleteReminder = async (reminder_id,timeout=null)=>{
        if(timeout)
            try{
                clearTimeout(timeout);
            }catch(e){
                console.log(e);
            }
        return Reminder.deleteOne({_id:reminder_id});
    };
    client.initReminders = async() => {
        let old_reminders = await Reminder.find({date:{$lte:(Date.now()+5000)}});
        old_reminders.forEach(async remd=>{
            await client.runReminder(remd);
            await client.deleteReminder(remd._id);
        });
        let new_reminders = await Reminder.find({date:{$gte:(Date.now()),$lte:(Date.now()+1000*60*60*12)}}).limit(100);
        new_reminders.forEach(async remd=>{
            await client.runReminder(remd);
        });
        
    };

    //============================


};