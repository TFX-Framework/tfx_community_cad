const { MessageEmbed } = require('discord.js');

module.exports.run = async (client , message, args) => {

    message.delete().catch()

    if (args[0] && client.commands.has(args[0])) {

        const command = client.commands.get(args[0]);

        let command_name = command.help.name.charAt(0).toUpperCase() + command.help.name.slice(1);

        let command_aliases = 'No aliases for that command.'

        if (command.help.aliases.lenght < 1) {
            command_aliases = 'No aliases for that command.'
        } else {
            command_aliases = command.help.aliases.join("\n")
        }
        const embed = new MessageEmbed()
        .setAuthor(`${command_name} Command Info`, structures.dmodv2)
        .setColor(structures.mainColor)
        .addField('Category', command.help.category, true)
        .addField('Name', command.help.name, true)
        .addField('Description', command.help.description, true)
        .addField('Aliases', '``' + command_aliases + '``', true)
        .addField('Usage', command.help.example.replace(/%P%/g, client.config.prefix), true)
        .addField('Required Perms', `User: ${command.requirements.userPerms}\nClient: ${command.requirements.clientPerms}`, true)
        .setTimestamp()

        return message.channel.send(embed)
    }

    let info_commands = client.commands.filter(command => command.help.category == 'Information');

    let utility_commands = client.commands.filter(command => command.help.category == 'Utility');

    let owner_commands = client.commands.filter(command => command.help.category == 'Owner');

    const embed2 = new MessageEmbed()
      embed2.setAuthor(`dmod.gg Help Command`, structures.dmodv2)
      embed2.setColor(structures.mainColor)
      embed2.setDescription(`Command Info: ${client.config.prefix}help <commandName>`)
      embed2.addField('Information Commands', info_commands.map(cmd => "``" + cmd.help.name + "``").join("** , **"), true)
      embed2.addField('Utility Commands', utility_commands.map(cmd => "``" + cmd.help.name + "``").join("** , **"), true)
//   if (process.env.DMOD_OWNERS.split(' ').includes(message.author.id)) {
//       embed2.addField('Owner Commands', owner_commands.map(cmd => "``" + cmd.help.name + "``").join("** , **"), true)
//   }
      embed2.setFooter('Syntax: <> = Require | [] = Optional', structures.dmodv2)

      return message.channel.send(embed2)
}


module.exports.help = {
    name: "help",
    category: "Information",
    aliases: ['helpme', 'h'],
    description: "Send you a list of all my commands!",
    example: "help | help <command_name>"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["EMBED_LINKS"],
    staffOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
