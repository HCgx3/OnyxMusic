const { Util } = require("discord.js");
const discord = require('discord.js');

module.exports.run = async (bot, message) => {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1)
    const playembederr = new discord.MessageEmbed()
        .setTitle('Onyx Music System')
        .setThumbnail('https://cdn.discordapp.com/attachments/716956812154503249/724966963184664576/image1.png')
        .setDescription('Something went wrong: **Probable Causes** --> \n 1. Onyx is already in another Voice Channel \n 2.You do not have permssions to perform this command \n 3.Its already playing a song')
        .setColor('#4AD194')
    if (!message.member.voice.channel) return message.channel.send(playembederr);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(playembederr);
    let query = args.join(" ")
    const queue = await bot.player.getQueue(message.guild.id);
    let tracks = [queue];
    if (!query) return message.channel.send(playembederr);
    let search = await bot.player.searchTracks(query).catch(e => {
        return message.channel.send(playembederr);
    });
    if (search.length < 1) return message.channel.send(playembederr);
    let track = search[0]; //whats wrong?
    if ((track.duration.split(":").length >= 3) && parseInt(track.duration.split(":")[0]) >= 3 && parseInt(track.duration.split(":")[2]) >= 1) return message.channel.send("❌ | Cannot play the songs that are longer than 3 hours.");
    if (bot.player.isPlaying(message.guild.id)) {
        let playing = await bot.player.addToQueue(message.guild.id, track, message.author);
        const qplayingemed = new discord.MessageEmbed()
            .setAuthor('Track added to the queue', 'https://cdn.discordapp.com/attachments/716956812154503249/724966963184664576/image1.png')
            .setDescription(`[${Util.escapeMarkdown(track.name)}](${Util.escapeMarkdown(track.url)})`)
            .setThumbnail(playing.thumbnail)
            .addField('Channel', `${Util.escapeMarkdown(track.author)}`, true)
            .addField('Duration', `\`\`${Util.escapeMarkdown(track.duration)}\`\``, true)
            .setColor('BLUE')
            .setFooter(`${message.author.tag} added this song to the queue`, `${message.author.displayAvatarURL()}`);
        return message.channel.send(qplayingemed);
    } else {
        let playing = await bot.player.play(message.member.voice.channel, track, message.author);
        const playingemed = new discord.MessageEmbed()
            .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
            .setDescription(`**Playing now**\n[${Util.escapeMarkdown(track.name)}](${Util.escapeMarkdown(track.url)})`)
            .setThumbnail(playing.thumbnail)
            .addField('Channel', `${Util.escapeMarkdown(track.author)}`, true)
            .addField('Duration', `\`\`${Util.escapeMarkdown(track.duration)}\`\``, true)
            .setColor('BLUE')
            .setFooter(`Current volume: 100% | Onyx Music System`)
        return message.channel.send(playingemed);
    }

}
module.exports.config = {
    name: "play",
    category: 'music',
    description: "plays music",
    usage: "<prefix>play <song>",
    accessableby: "members",
    aliases: ['p']
}