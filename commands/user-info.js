const { MessageEmbed } = require('discord.js');
const Users = require('../app/models/user');

module.exports.run = async (client , message, args) => {

      message.delete().catch()

     try { 

    let user = args.slice(0).join(" ");

    if (!user) return message.reply('Please provide a users username from the CAD')
     
    let fetched_user = await Users.findOne({ user.username: user.id });

   // if (!fetched_user) await new Users({ discordUserID: user.id }).save();

   if (!fetched_user) return message.reply("User does not exist in the Database, Are you sure you got the Username right?")
    
    let embed = new MessageEmbed()
      .setAuthor("User Information", client.config.logo)
      .setDescription(`${fetched_user.username}s Information`)
      .addField("Name", `${fetched_user.name}`)
      .addField("Call Sign", `${fetched_user.user.callSign}`)
      .setFooter('© 2021 ToxicFX Community CAD', client.config.logo)

     return message.channel.send(embed)

   } catch (error) {

        let error_embed = new MessageEmbed()
        .setAuthor('Critical Error: Command Failed', client.config.logo)
        .setColor(client.config.color)
        .setDescription('Please report this to <!@510065483693817867 >')
        .addField('Error', `${error.message}`, true)
        .setTimestamp()
        .setFooter('© 2021 ToxicFX Community CAD', client.config.logo)
        
        return message.channel.send(error_embed)

    }
}


module.exports.help = {
    name: "user-info",
    category: "Cad-Users",
    aliases: [],
    description: "Show some info about the Specified User!",
    example: "user-info <UserMention>"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["EMBED_LINKS"],
    staffOnly: false,
    enabled: true
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
