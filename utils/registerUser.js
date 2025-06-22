const registerUser = async (client, member, tzOffset = 0) => {
    const exists = await client.profileExists(member.id);
    if (exists) return false;

    const profile = {
        guildID: member.guild.id,
        guildName: member.guild.name,
        userID: member.id,
        username: member.user.tag,
        joinDate: Date.now()
    };

    if (typeof tzOffset === 'number') profile.tz_offset = tzOffset;
    await client.createProfile(profile);
    return true;
};

module.exports = registerUser;

