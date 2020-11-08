
module.exports = async client => {
    console.log(`Logged in as ${client.user.tag}!`);

    const welcomeChannel = client.channels.cache.get(client.config.defaultSettings.welcomeChannelID);
    const rolesChannel = client.channels.cache.get(client.config.defaultSettings.rolesChannelID);
    // update users database
    
    await client.updateDatabase();

    await client.initReminders();


    // fetch messages on default channels

    //const fetchedMessages = [welcome,roles_];
    welcomeChannel.messages.fetch({ limit: 1 }).then(collected => {
        if(collected.size <= 0){
            client.welcomeInitialize(welcomeChannel);
            console.log("Welcome channel initialized!");
        }else{
            collected.forEach(message=>{
                message.reactions.cache.forEach(reaction=>{
                    reaction.users.cache.forEach(user=>{
                        console.log("User: "+user.tag);
                    })
                });
            });
            // update missing reactions ?
            // update users that reacted while bot offline:?
        }
    });

    rolesChannel.messages.fetch({ limit: 1 }).then(collected => {
        if(collected.size <= 0){
            client.rolesInitialize(rolesChannel);
            console.log("Roles channel initialized!");
        }else{
            collected.forEach(message=>{
                message.reactions.cache.forEach(reaction=>{
                    reaction.users.cache.forEach(user=>{
                        console.log("User: "+user.tag);
                    })
                });
            });
            // update missing reactions ?
            // update users that reacted while bot offline:?
        }
    });
    
    /*TO-DO

        REFRESH REMINDER COUNTERS

    */
    

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