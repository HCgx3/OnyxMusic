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
            const bassboostEnabled = bot.player.getQueue(message.guild.id).filters.bassboost;
            if(!bassboostEnabled){
                try {
                    bot.player.setFilters(message.guild.id, {
                        bassboost: true
                    })  
                    const BassBoostembed = new discord.MessageEmbed()
                    .setAuthor(`${message.author.tag} has Bassboosted the current song`, `${message.author.displayAvatarURL()}`)
                    .setTitle('Successfully Bassboosted')
                    .setDescription(`Music has been successfully BassBoosted\n Song BassBoosted: [${song.name}](${song.url})\n To simply Disable BassBoost: \`\`${botprefix}BassBoost\`\``)
                    .setColor('BLUE')
                    .setFooter('Onyx Music System');
                return message.channel.send(BassBoostembed)                 
                } catch (error) {
                    message.channel.send(`Opps something went wrong try again later..`)
                    console.log(error)  
                }
 

        }else {

            try {
                bot.player.setFilters(message.guild.id, {
                    bassboost: false
                })
                const Bassembed = new discord.MessageEmbed()
                .setAuthor(`${message.author.tag} has Disabled Bassboost the current song`, `${message.author.displayAvatarURL()}`)
                .setTitle('Successfully Disabled Bassboost')
                .setDescription(`Music has been successfully Disabled BassBoost\n Song BassBoost Disabled: [${song.name}](${song.url})\n To simply Enable BassBoost: \`\`${botprefix}BassBoost\`\``)
                .setColor('BLUE')
                .setFooter('Onyx Music System');
                return message.channel.send(Bassembed) 
            } catch (error) {
                message.channel.send(`Opps something went wrong try again later..`)
                console.log(error)
            }


        
        }}

module.exports.config = {
    name: "bassboost",
    category: 'music',
    description: "BASSBOOST's Your music",
    usage: "<prefix>resume",
    accessableby: "members",
    aliases: []
}