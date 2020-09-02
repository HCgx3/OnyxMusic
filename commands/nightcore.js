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
            const bassboostEnabled = bot.player.getQueue(message.guild.id).filters.nightcore;
            if(!bassboostEnabled){
                try {
                    bot.player.setFilters(message.guild.id, {
                        nightcore: true
                    })  
                    const BassBoostembed = new discord.MessageEmbed()
                    .setAuthor(`${message.author.tag} has NightCore the current song`, `${message.author.displayAvatarURL()}`)
                    .setTitle('Successfully NightCore')
                    .setDescription(`Music has been successfully NightCore\n Song NightCore: [${song.name}](${song.url})\n To simply Disable NightCore: \`\`${botprefix}NightCore\`\``)
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
                    nightcore: false
                })
                const Bassembed = new discord.MessageEmbed()
                .setAuthor(`${message.author.tag} has Disabled NightCore the current song`, `${message.author.displayAvatarURL()}`)
                .setTitle('Successfully Disabled NightCore')
                .setDescription(`Music has been successfully Disabled NightCore\n Song NightCore Disabled: [${song.name}](${song.url})\n To simply Enable NightCore: \`\`${botprefix}NightCore\`\``)
                .setColor('BLUE')
                .setFooter('Onyx Music System');
                return message.channel.send(Bassembed) 
            } catch (error) {
                message.channel.send(`Opps something went wrong try again later..`)
                console.log(error)
            }


        
        }}

module.exports.config = {
    name: "nightcore",
    category: 'music',
    description: "nightcores's Your music",
    usage: "<prefix>nightcore",
    accessableby: "members",
    aliases: ['nc']
}