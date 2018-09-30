const access = require('./key.json');
const config = require('./config.json');
const moment = require('moment');
const Discord = require('discord.js');
const hypixel = require('hypixeljs');
const util = require('./lib/util');

const other = require('./lib/command/other.js');
const guild = require('./lib/command/guild.js');
const player = require('./lib/command/player.js');

// Discord setup
const bot = new Discord.Client();
bot.login(access.discord_token);
bot.on('ready', () => console.log(`Dispixel is ready to rock and roll! Started at ${moment().format()}`));

// Hypixel API setup
hypixel.login(access.hypixel_api_keys);

// Logging Feature of all our command.
bot.on('message', (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;
	const args = message.content.replace(config.prefix, '').split(/ +/g); // splits the message with each space
	const cmd = args.shift();

	console.log(`[COMMAND REQUEST] by ${message.author.id} (${message.author.username}) requesting ${cmd} with arguments: ${args} from guild ${message.guild.id}`);
});

// Listen for command
other.listen(bot, config.prefix, util);
guild.listen(bot, config.prefix, util, hypixel);
player.listen(bot, config.prefix, util, hypixel);
