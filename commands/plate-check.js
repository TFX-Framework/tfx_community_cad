const { MessageEmbed } = require('discord.js');
const Registry = require('../app/models/vehicle');

module.exports.run = async (client , message, args) => {

   message.delete().catch()

 try { 

    let plate = args.slice(0).join(" ");

   let no_plate = new MessageEmbed()
      .setAuthor('User Error: Missing Args', client.config.logo)
      .setColor(client.config.color)
      .setDescription('Please provide a Plate to fetch.')
      .addField('Example', `cad.plate-check 2FAST4U`, true)
      .setTimestamp()
      .setFooter('© 2021 ToxicFX Community CAD', client.config.logo)
        

    if (!plate) return message.channel.send(no_user)
     
    let ncic = await Registry.findOne({ "vehicle.plate": plate });

   if (!ncic) return message.reply("License Plate does not exist in the Database, Are you sure you got it right?")
    
    let embed = new MessageEmbed()
      .setAuthor("Vehicle Lookup", client.config.logo)
      .addField("Model", `${ncic.vehicle.model}`, true)
      .addField("Plate", `${ncic.vehicle.plate}`, true) 
      .addField("Color", `${ncic.vehicle.color}`, true) 
      .addField("Registration Status", `${ncic.vehicle.validRegistration}`, true)
      .addField("Insurance Status", `${ncic.vehicle.validInsurance}`, true) 
      .addField("Registered Owner", `${ncic.vehicle.registeredOwner}`, true)
      .addField("VIN Number", `${ncic.vehicle.vin}`, true)
      .addField("Stolen Status", `${ncic.vehicle.isStolen}`, true) 
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
    name: "plate-check",
    category: "DMV",
    aliases: ['plate'],
    description: "Run a Plate Check!",
    example: "plate-check 2fast4u"
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
