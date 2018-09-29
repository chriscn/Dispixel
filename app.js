const access = require('./key.json');
const config = require('./config.json');
const moment = require('moment');
const Discord = require('discord.js');
const hypixel = require('hypixeljs');

const cmd_other = require('./lib/command/other.js');
const cmd_guild = require('./lib/command/guild.js');
const cmd_player = require('./lib/command/player.js');

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
	const user = message.member.user.id;
	console.log(`[COMMAND REQUEST] by ${user} (${message.author.username}) requesting ${cmd} with arguments: ${args} from ${message.guildID == null ? 'Direct Messages' : message.guildID}`);
});

// Listen for command
cmd_other.listen(bot);
cmd_guild.listen(bot);
cmd_player.listen(bot);
