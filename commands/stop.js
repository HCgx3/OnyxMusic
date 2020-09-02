const discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
    let botprefix = "m!"
            const stopembederr = new discord.MessageEmbed()
                .setTitle('Onyx Music System')
                .setThumbnail('https://cdn.discordapp.com/attachments/716956812154503249/724966963184664576/image1.png')
                .setDescription('Something went wrong: **Probable Causes** --> \n 1. Onyx is already in another Voice Channel \n 2.You do not have permssions to perform this command \n 3.Its already playing a song \n 4.You are not in a voice channel')
                .setColor('BLUE')

            const Stopembed = new discord.MessageEmbed()
                .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                .setFooter(`${message.author.tag} has stopped the current song`, `${message.author.displayAvatarURL()}`)
                .setDescription('Music playback stopped and left the voice channel.')
                .setColor('BLUE')
                .setFooter('System Message By Onyx Bot');
            if (!message.member.voice.channel) return message.channel.send(stopembederr);
            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(stopembederr);
            if (!bot.player.isPlaying(message.guild.id)) {
                return message.channel.send(stopembederr);
            }
            await bot.player.stop(message.guild.id).catch(err => {
                return message.channel.send(`Opps something went wrong try again later..`)
                console.log(err)
            })
            return message.channel.send(Stopembed)
        }
    
module.exports.config = {
    name: "stop",
    description: "Stop and disconnects the bot and music",
    usage: "<prefix>stop",
    category: 'music',
    accessableby: "Members",
    aliases: ['disconnect']
}