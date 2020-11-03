module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);

    const { welcomeChannelName,rolesChannelName } = client.config.defaultSettings;
    const welcomeChannel = client.channels.find(c => c.name === welcomeChannelName);
    const rolesChannel = client.channels.find(c => c.name === rolesChannelName);
    // fetch messages on default channels

    //const fetchedMessages = [welcome,roles_];
    welcomeChannel.fetchMessages({ limit: 1 }).then(collected => {
        if(collected.size <= 0){
            client.welcomeInitialize();
        }else{
            // update missing reactions ?
            // update users that reacted while bot offline:?
        }
    });

    rolesChannel.fetchMessages({ limit: 1 }).then(collected => {
        if(collected.size <= 0){
            client.rolesInitialize();
        }else{
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