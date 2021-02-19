
# Making a bot with avaliable code and ideas from github


# discord.js-series
Follow along with my Discord.js Bot Development series on YouTube!

YouTube Playlist: https://www.youtube.com/playlist?list=PLeLrvnqwEnOasx86ozE-cdf1JagGcUlRf

Discord: https://discord.gg/g7wr8xb

Website: https://thenerdcave.us

Want to contribute or submit requests for new videos! Join the [Discord](https://discord.gg/g7wr8xb) or send us an [email](mailto:contact@thenerdcave.us)!

# To-Do List:

#### Enhance current help system
#### make a bonfire-like help scroll mechanism
#### make more commands in config.js, for admin-less command
#### add a hide.js command
#### fix welcome message caching!!!!!!

## Implement Bonfire command list

```
Admin Commands
These are commands that allow more intuitive configuration, that don't fit into the config command
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
disable <command>
Disables the use of a command on this server
enable <command>
Enables the use of a command on this server
notify <role> <message>
Notify everyone in "role" with "message"
restrictions
Used to list all the current restrictions set
restrict [options...]
This is an intuitive command to restrict something to/from something
unrestrict [options...]
This is an intuitive command to unrestrict something to/from something
perms <command>
This command can be used to print the current allowed permissions on a specific command
nickname [name]
Used to set the nickname for Bonfire (provide no nickname and it will reset)



Birthday Commands
Track and announce birthdays
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
birthday [member]
A command used to view the birthdays on this server; or a specific member's birthday



Blackjack Commands
Pretty self-explanatory
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
blackjack
Creates a game/joins the current running game of blackjack



GuildConfiguration Commands
Handles configuring the different settings that can be used on the bot
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
config [opt]
Handles the configuration of the bot for this server



Hangman Commands
Pretty self-explanatory
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
hangman <guess>
Makes a guess towards the server's currently running hangman game



Images Commands
Commands that post images, or look up images
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
cat
Use this to print a random cat image.
doggo
Use this to print a random doggo image.
snek
Use this to print a random snek image.
horse
Use this to print a random horse image.
duck
Use this to print a random duck image.
snail
Use this to print a random snail image.
pleco
Use this to print a random pleco image.
moth
Use this to print a random moth image.
avatar [member]
Provides an image for the provided person's avatar (yours if no other member is provided)



Images Commands
Commands that post images, or look up images
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
derpi [search...]
Provides a random image from the first page of derpibooru.org for the following term
e621 <tags>
Searches for a random image from e621.net



Interaction Commands
Commands that interact with another user
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
hug [user]
Makes me hug a person!
battle [player2]
Challenges the mentioned user to a battle
accept
Accepts the battle challenge
decline
Declines the battle challenge
boop [boopee] [message]
Boops the mentioned person



Links Commands
This class contains all the commands that make HTTP requests
In other words, all commands here rely on other URL's to complete their requests
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
urban <msg>
Pulls the top urbandictionary.com definition for a term
google <query>
Searches google for a provided query
youtube <query>
Searches youtube for a provided query
wiki <query>
Pulls the top match for a specific term from wikipedia, and returns the result



Miscellaneous Commands
Core commands, these are the miscallaneous commands that don't fit into other categories'
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
coinflip
Flips a coin and responds with either heads or tails
say <msg>
Tells the bot to repeat what you say
calendar [month] [year]
Provides a printout of the current month's calendar
info
This command can be used to print out some of my information
uptime
Provides a printout of the current bot's uptime
addbot
Provides a link that you can use to add me to a server
roll [notation='d6']
Rolls a die based on the notation given
help [command]
Shows help about a command or the bot
ping
Returns the latency between the server websocket, and between reading messages



Moderation Commands
Moderation commands, things that help control a server...but not the settings of the server
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
kick <member> [reason]
Used to kick a member from this server
unban <member_id>
Used to unban a member from this server
ban <member> [reason]
Used to ban a member
purge [limit=100]
This command is used to a purge a number of messages from the channel
prune [specifications...]
This command can be used to prune messages from certain members



Osu Commands
View OSU stats
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
osu [member]
Provides basic information about a specific user




Polls Commands
Create custom polls that can be tracked through reactions
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
poll <question>
Sets up a poll based on the question that you have provided.



Raffle Commands
Used to hold custom raffles
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
raffles
Used to print the current running raffles on the server
raffle <raffle_id>
Used to enter a raffle running on this server



Roles Commands
Class to handle management of roles on the server
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
colour <role_colour>
Used to give yourself a role matching the colour given.
role [role]
This command can be used to modify the roles on the server.
assign [role...]
Assigns the provided role(s) to you, if they can be assigned
unassign [role...]
Unassigns the provided role(s) to you, if they can be assigned



Roulette Commands
A fun game that ends in someone getting kicked!
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
roulette
Joins the current running roulette



Spotify Commands
Pretty self-explanatory
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
spotify <query>
Searches Spotify for a song, giving you the link you can use to listen in. Give the query to search for



Stats Commands
Leaderboard/stats related commands
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
serverinfo
Provides information about the server
userinfo [user]
Provides information about a provided member
command
No help given
mostboops
Shows the person you have 'booped' the most, as well as how many times
listboops
Lists all the users you have booped and the amount of times
leaderboard
Prints a leaderboard of everyone in the server's battling record
battlestats [member]
Prints the battling stats for you, or the user provided



Tags Commands
This class contains all the commands for custom tags
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
tags
Prints all the custom tags that this server currently has
mytags
Prints all the custom tags that this server that you own
tag <trigger>
This can be used to call custom tags



TicTacToe Commands
Pretty self-explanatory
Support
For more help, join the official bot support server: https://discord.gg/f6uzJEj
tictactoe <option>
Updates the current server's tic-tac-toe board
```