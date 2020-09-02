const Discord = require("discord.js")
module.exports.run = async (bot, message, args) => {
    let helpArray = message.content.split(" ");
    let helpArgs = helpArray.slice(1);

    let music = bot.commands.filter(d => d.config.category === 'music').map(d => `\`${d.config.name}\``)

    let configembed = new Discord.MessageEmbed()
    .setTitle('🎵 Music Commands 🎵')
    .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
    .setThumbnail(`https://cdn.discordapp.com/attachments/716956812154503249/724966963184664576/image1.png`)
    .setDescription(`${music.join(", ")}`)
    .setColor('GREEN')
    .setTimestamp()
    .setFooter(`Requested by ${message.author.tag} | Prefix\: m! `)
    message.channel.send(configembed)


    let command = bot.commands.get(bot.aliases.get(helpArgs[0].toLowerCase()) || helpArgs[0].toLowerCase())
                if (!command) {
                    return message.channel.send('Couldn\'t find that command.')
                }

                const commandembed = new Discord.MessageEmbed()
                    .setTitle(`${command.config.name}`)
                    .setThumbnail(`https://cdn.discordapp.com/attachments/716956812154503249/724966963184664576/image1.png`)
                    .addField('Name', `${command.config.name}`, true)
                    .addField('Description', `${command.config.description}`)
                    .addField('Category', `${command.config.category.slice(0, 1).toUpperCase() + command.config.category.slice(1)}`)
                    .addField('Cooldown', `\`${command.config.cooldown} second(s)\``)
                    .addField('Usage', `\`${command.config.usage}\``)
                    .addField('Aliases', `${command.config.aliases.join(", ") ? command.config.aliases.join(", ") : 'None'}`)
                    .addField('Accessible By', `${command.config.accessableby}`)
                    .setFooter(`Requested by ${message.author.tag} | Prefix\: ??`)
                    .setColor('GREEN')
                message.channel.send(commandembed)




}

module.exports.config = {
    name: "help",
    description: "Help menu",
    usage: "m!help",
    accessableby: "members",
    aliases: []
}