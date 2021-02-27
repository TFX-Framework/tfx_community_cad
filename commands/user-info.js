const { MessageEmbed } = require('discord.js');
const Users = require('../app/models/user');

module.exports.run = async (client , message, args) => {

   message.delete().catch()

 try { 

    let the_user = args.slice(0).join(" ");

   let no_user = new MessageEmbed()
      .setAuthor('User Error: Missing Args', client.config.logo)
      .setColor(client.config.color)
      .setDescription('Please provide a Username to fetch.')
      .addField('Example', `cad.user-info TheRealToxicDev`, true)
      .setTimestamp()
      .setFooter('© 2021 ToxicFX Community CAD', client.config.logo)
        

    if (!the_user) return message.reply(no_user)
     
    let fetched_user = await Users.findOne({ "user.username": the_user });

   // if (!fetched_user) await new Users({ user: user }).save();

   if (!fetched_user) return message.reply("User does not exist in the Database, Are you sure you got the Username right?")
    
    let embed = new MessageEmbed()
      .setAuthor("User Information", client.config.logo)
      .setDescription(`${fetched_user.user.username}s Information`)
      .addField("Call Sign", `${fetched_user.user.callSign}`, true)
      .addField("Active Community(s)", `${fetched_user.user.activeCommunity}`, true) 
      .addField("Dispatch Status", `${fetched_user.user.dispatchStatus}`, true)
      .addField("Status Set By", `${fetched_user.user.dispatchStatusSetBy}`, true) 
      .addField("Dispatch On Duty", `${fetched_user.user.dispatchOnDuty}`, true)
      .addField("Panic Sound Enabled", `${fetched_user.user.panicButtonSound}`, true) 
      .addField("Account Created", `${fetched_user.user.createdAt}`, true)
      .addField("Last Updated", `${fetched_user.user.updatedAt}`, true) 
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
    name: "user-info",
    category: "Users",
    aliases: ['user'],
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
