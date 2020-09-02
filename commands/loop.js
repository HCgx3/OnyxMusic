const { Util } = require("discord.js");
const discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let botprefix = "m!"
            const ErrorEmbed = new discord.MessageEmbed()
                .setTitle('Onyx Music System')
                .setThumbnail('https://cdn.discordapp.com/attachments/716956812154503249/724966963184664576/image1.png')
                .setDescription('Something went wrong: **Probable Causes** --> \n 1. Onyx is already in another Voice Channel \n 2.You do not have permssions to perform this command \n 3.Its already playing a song \n 4.You are not in a voice channel')
                .setColor('BLUE')
            if (!message.member.voice.channel) return message.channel.send(ErrorEmbed);
            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(ErrorEmbed);
            if (!bot.player.isPlaying(message.guild.id)) {
                return message.channel.send(ErrorEmbed)
            }
            let song = await bot.player.resume(message.guild.id);
            const repeatModeEnabled = bot.player.getQueue(message.guild.id).repeatMode;
            if(repeatModeEnabled){
                try {
                    bot.player.setRepeatMode(message.guild.id, false);
                 
                    const Repeatembed = new discord.MessageEmbed()
                    .setAuthor(`${message.author.tag} has Disabled RepeatMode for the current song`, `${message.author.displayAvatarURL()}`)
                    .setTitle('Successfully Disabled Looped')
                    .setDescription(`Music has been successfully Disabled Loop mode\n Song Looping Stopped: [${song.name}](${song.url})\n To simply Enable RepeatMode: \`\`${botprefix}loop\`\``)
                    .setColor('BLUE')
                    .setFooter('Onyx Music System');
                return message.channel.send(Repeatembed)                 
                } catch (error) {
                    message.channel.send(`Opps something went wrong try again later..`)
                    console.log(error)  
                }
 

        }else {

            try {
                bot.player.setRepeatMode(message.guild.id, true);
                const repeatembed = new discord.MessageEmbed()
                .setAuthor(`${message.author.tag} has Enabled RepeatMode for the current song`, `${message.author.displayAvatarURL()}`)
                .setTitle('Successfully Enabled RepeatMode')
                .setDescription(`Music has been successfully Enabled RepeatMode\n Song RepeatMode Enabled: [${song.name}](${song.url})\n To simply Enable RepeatMode: \`\`${botprefix}loop\`\``)
                .setColor('BLUE')
                .setFooter('Onyx Music System');
                return message.channel.send(repeatembed) 
            } catch (error) {
                message.channel.send(`Opps something went wrong try again later..`)
                console.log(error)
            }


        
        }}

module.exports.config = {
    name: "loop",
    category: 'music',
    description: "BASSBOOST's Your music",
    usage: "<prefix>loop",
    accessableby: "members",
    aliases: ['repeatmode']
}