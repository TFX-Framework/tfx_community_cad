const { MessageEmbed } = require('discord.js');
const Registry = require('../app/models/firearm');

module.exports.run = async (client , message, args) => {

   message.delete().catch()

 try { 

    let serial = args.slice(0).join(" ");

   let no_user = new MessageEmbed()
      .setAuthor('User Error: Missing Args', client.config.logo)
      .setColor(client.config.color)
      .setDescription('Please provide a Firearm Serial Number to fetch.')
      .addField('Example', `cad.firearm-check XQX0G7EE`, true)
      .setTimestamp()
      .setFooter('© 2021 ToxicFX Community CAD', client.config.logo)
        

    if (!serial) return message.reply(no_user)
     
    let registry = await Registry.findOne({ "firearm.serialNumber": serial });

   if (!registry) return message.reply("Firearm does not exist in the Database, Are you sure you got the Serial Number right?")
    
    let embed = new MessageEmbed()
      .setAuthor("Firearm Lookup", client.config.logo)
      .setDescription(`${fetched_user.user.username}s Information`)
      .addField("Firearm  Type", `${registry.firearm.weaponType}`, true)
      .addField("Registered Owner", `${registry.firearm.registeredOwner}`, true) 
      .addField("Stolen Status", `${registry.firearm.isStolen}`, true)
      .setFooter('© 2021 ToxicFX Community CAD', client.config.logo)

     return message.channel.send(embed)

   } catch (error) {

        let error_embed = new MessageEmbed()
        .setAuthor('Critical Error: Command Failed', client.config.logo)
        .setColor(client.config.color)
        .setDescription('Please report this to <@!510065483693817867> Along with a Description of what you were doing when you triggered the error')
        .addField('Error Message', `${error.message}`, true)
        .addFiel('Report a Bug', 'https://forms.toxicfx.org/bugs/', true) 
        .setTimestamp()
        .setFooter('© 2021 ToxicFX Community CAD', client.config.logo)
        
        return message.channel.send(error_embed)

    }
}


module.exports.help = {
    name: "firearm-check",
    category: "Registry",
    aliases: ['gun', 'firearm', 'gun-check'],
    description: "Run a Gun Check!",
    example: "firearm-check <SerialNumber>"
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
