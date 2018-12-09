const fs = require('fs');
const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const moment = require('moment');
const DBL = require('dblapi.js');
const { prefix, icons } = require('./config.json');
const { discord_token, hypixel_api_keys, discord_bots } = require('./key.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const dbl = new DBL(discord_bots, bot);

const commandsFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {
	const commands = require(`./commands/${file}`);
	bot.commands.set(commands.name, commands);
}

const cooldowns = new Discord.Collection();

bot.on('ready', () => {
	console.log(
		`Dispixel started at ${moment()}, running on ${
			bot.guilds.array().length
		} guilds.`
	);
	bot.user
		.setActivity('Hypixel API', { type: 'PLAYING' })
		.then(presence =>
			console.log(
				`Activity set to ${presence.game ? presence.game.name : 'none'}`
			)
		)
		.catch(console.error);
	setInterval(() => {
		dbl.postStats(bot.guilds.size);
	}, 7200);
});

bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandsName = args.shift().toLowerCase();

	const commands =
		bot.commands.get(commandsName) ||
		bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandsName));

	if (!commands) return;

	if (commands.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that commands inside DMs!');
	}

	if (commands.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (commands.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${commands.name} ${
				commands.usage
			}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(commands.name)) {
		cooldowns.set(commands.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(commands.name);
	const cooldownAmount = (commands.cooldown || 3) * 1000;

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	} else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`please wait ${timeLeft.toFixed(
					1
				)} more second(s) before reusing the \`${commands.name}\` commands.`
			);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		commands.execute(message, args, bot);
	} catch (error) {
		message.reply(
			new Discord.RichEmbed()
				.setTitle('An Error Occurred!')
				.setColor('#e84118')
				.setThumbnail(icons.warning)
				.addField('For debugging purposes:', error.toString().split('\n')[0])
		);
		console.error(error);
	}
});

dbl.on('posted', () => {
	console.log('Server count posted!');
});

dbl.on('error', e => {
	console.log(`Oops! ${e}`);
});

bot.login(discord_token);
hypixeljs.login(hypixel_api_keys);
