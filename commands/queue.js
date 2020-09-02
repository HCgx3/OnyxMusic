const { Util } = require("discord.js");
const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let botprefix = "m!"
             const ErrorEmbed = new discord.MessageEmbed()
             .setTitle('Onyx Music System')
             .setThumbnail('https://cdn.discordapp.com/attachments/716956812154503249/724966963184664576/image1.png')
             .setDescription('Something went wrong: **Probable Causes** --> \n 1. Onyx is already in another Voice Channel \n 2.You do not have permssions to perform this command \n 3.Its already playing a song \n 4.You are not in a voice channel')
             .setColor('BLUE')
        if(!message.member.voice.channel) return message.channel.send(ErrorEmbed);
        if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(ErrorEmbed);
        if(!bot.player.isPlaying(message.guild.id)){
          return message.channel.send(ErrorEmbed)
        }
        let song = await bot.player.nowPlaying(message.guild.id);
        let queue = await bot.player.getQueue(message.guild.id);

      const resumeembed = new discord.MessageEmbed()
      message.channel.send('Server queue:\n'+(queue.tracks.map((track, i) => {
        return `${i === 0 ? 'Current' : `#${i+1}`} - ${track.name} | ${track.author}`;
    }).join('\n')));
}

  
module.exports.config = {
    name: "resume",
    category: 'music',
    description: "resumes Paused Music",
    usage: "<prefix>resume",
    accessableby: "members",
    aliases: []
}