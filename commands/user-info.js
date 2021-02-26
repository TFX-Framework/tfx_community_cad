const { MessageEmbed } = require('discord.js');
const Users = require('../app/models/user');

module.exports.run = async (client , message, args) => {

      message.delete().catch()

      function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	     }
          }

    if (args[0]) {
       const user = getUserFromMention(args[0]);
    if (!user) {
       return message.reply('Please use a proper mention if you want to see someone elses avatar.');
    }
    let fetched_user = await Users.findOne({ discordUserID: user.id });

    if (!fetched_user) await new Users({ discordUserID: user.id }).save();
    
    let embed = new MessageEmbed()
      .setAuthor("User Information", client.config.logo)
      .setDescription(`${fetched_user.user.username}s Information`)
      .addField("Name", `${fetched_user.user.name}`)
      .addField("Call Sign", `${fetched_user.user.callSign}`)
      .setFooter('© 2021 ToxicFX Community CAD', client.config.logo)

     return message.channel.send(embed)
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
    staffOnly: false
}

module.exports.limits = {
    rateLimit: 2,
    cooldown: 1e4
}
