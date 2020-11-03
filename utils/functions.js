const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { Cc_value,Cryptocurrency,Guild, Profile } = require('../models');
const { RichEmbed } = require('discord.js');

module.exports = client => {
    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return client.config.defaultSettings;
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

    client.getProfile = async user => {
        const data = await Profile.findOne({ userID: user.id });
        if (data) return data;
        else return;
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
            returnList.push(item.split(".js")[0]);
        });
        return returnList;
    };


    // ====  WELCOME_INITIALIZER ===
    client.welcomeInitialize = () => {
        let embed = new RichEmbed()
            .setAuthor(welcomeChannel.guild.name,welcomeChannel.guild.iconURL)
            .setColor(0x1f3f52)
            .setTitle("Welcome to "+welcomeChannel.guild.name)
            .setDescription(">> click ✅ to verify <<")
            .setImage("https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fsearch%2Fcrab-dancing-gifs&psig=AOvVaw3CTztTLauDs7AyicxNxUmU&ust=1603677941540000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKCtuYPUzuwCFQAAAAAdAAAAABAg");

        welcomeChannel.send(embed).then(async msg => {
            await msg.react('✅');
        });
    };
    client.rolesInitialize = () => {
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

    client.createReminder = (user,data) => {

    };
    client.updateReminder = (user,data) => {
        
    };
    client.deleteReminder = (user,mode) => {

    };
};