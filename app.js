const access = require('./key.json');
const commands = require('./lib/commands.js');
const config = require('./config.json');
const moment = require('moment');
const cmd_other = require('./lib/commands/other.js');
const Discord = require('discord.js');
const hypixel = require('hypixeljs');

// Discord setup
const bot = new Discord.Client();
bot.login(access.discord_token);

// Hypixel API setup
hypixel.login(access.hypixel_api_keys);

bot.on('ready', () => console.log(`Dispixel is ready to rock and roll! Started at ${moment().format()}`));

// Logging Feature of all our commands.
bot.on('message', (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;
	const args = message.content.replace(config.prefix, '').split(/ +/g); // splits the message with each space
	const cmd = args.shift();
	const user = message.member.user.id;
	console.log(`[COMMAND REQUEST] by ${user} (${message.author.username}) requesting ${cmd} with arguments: ${args} from ${message.guildID == null ? 'Direct Messages' : message.guildID}`);
});

//Listen for commands
commands.listen(bot);
cmd_other.listen(bot);

