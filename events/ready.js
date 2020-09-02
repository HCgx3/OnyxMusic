const Discord = require('discord.js');
  
module.exports = bot => {
const { Client } = require('discord.js');

console.log(`✅|${bot.user.username} is up and working`) +
bot.user.setStatus("online"); 

let statuses = [
 `Over ${bot.guilds.cache.size} Servers`,
 `@ me for more info`,
 `Over ${bot.users.cache.size} Users`,
 `Listening to Cool Songs`
];

setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, {type: "LISTENING"});
}, 12000);

}
