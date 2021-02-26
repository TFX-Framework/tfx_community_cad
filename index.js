const { Client, Collection } = require ('discord.js');
const { cpuUsage } = require('process');
const config = require('./config/client');

require("./app");

const client = new Client({
    disableMentions: 'everyone',
    disabledEvents: ['TYPING_START']
});

client.commands = new Collection();
client.aliases = new Collection();

client.limits = new Map();
client.queue = new Map();

client.token = process.env.TOKEN;

/** SNIPE MAP FOR DELETED MESSAGES 😍 */
client.snipeMap = new Map();

const commands = require ('./structures/commands');
commands.run(client);

const events = require ('./structures/events');
events.run(client);

module.exports.init = async (token) => {

    client.userBaseDirectory = __dirname;

     await client.login(token);

    return client;

}
