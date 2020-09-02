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

            let song = await bot.player.nowPlaying(message.guild.id);
            let vol = await bot.player.getQueue(message.guild.id);

            try {
                const playingemed = new discord.MessageEmbed()
                    .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                    .setDescription(`**Playing now**\n[${song.name}](${song.url})`)
                    .setThumbnail(song.thumbnail)
                    .addField('Channel', `${song.author}`, true)
                    .addField('Duration', `\`\`${song.duration}\`\``, true)
                    .addField('Progress', bot.player.createProgressBar(message.guild.id))
                    .setColor('BLUE')
                    .setFooter(`Current volume: ${vol.volume}% | Onyx Music System`)
                return message.channel.send(playingemed);
            } catch (error) {
                message.channel.send(`Opps something went wrong try again later..`)
                console.log(error)
            }


        }

module.exports.config = {
    name: "nowplaying",
    category: 'music',
    description: "Displays the current song playing",
    usage: "<prefix>nowplaying",
    accessableby: "members",
    aliases: []
}