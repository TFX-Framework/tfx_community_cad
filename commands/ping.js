const { MessageEmbed } = require ('discord.js');

module.exports.run = async (client, message, args) => {

    let client_ping = client.ws.ping;

    var milliseconds = parseInt((client.uptime % 1000) / 100),
    seconds = parseInt((client.uptime / 1000) % 60),
    minutes = parseInt((client.uptime / (1000 * 60)) % 60),
    hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    let ping_embed = new MessageEmbed()
     .setAuthor('Ping and Uptime', client.config.logo)
     .setColor('#D41616')
     .addField('Client Ping', `${client_ping}ms`, true)
     .addField('Client Uptime', `${hours}h ${minutes}m ${seconds}s`, true)
     .setTimestamp()
     .setFooter('© 2021 ToxicFX', client.config.logo)

     let please_wait = new MessageEmbed()
     .setAuthor('I guess i can do that', client.config.logo)
     .setColor('#D41616')
     .setThumbnail('https://cdn.discordapp.com/attachments/734686866690932767/802314481538826270/loading.gif')
     .setDescription('Give me a minute to gather my thoughts and get you the stats!')
     .setTimestamp()
     .setFooter(`Requested By: ${message.author.username}`, client.config.logo)

    await message.channel.send(please_wait)
    
     .then(async(msg) => { 
         await msg.delete({ timeout: 5000 })
    }).catch(console.error);

    message.channel.send(ping_embed);
};

module.exports.help = {
    name: "ping",
    category: "Info",
    aliases: ['pong'],
    description: "Latency, Uptime, Response Time and Ping!",
    example: "ping"
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
