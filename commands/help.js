const Discord = require('discord.js');
const { prefix } = require('../config.json');
const { capitalize } = require('../lib/dispixelutil');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific commands.',
	aliases: ['commands'],
	usage: '[commands name]',
	cooldown: 5,
	execute(message, args) {
		const helpEmbed = new Discord.RichEmbed();
		helpEmbed.setColor('#00a8ff');
		const { commands } = message.client;

		if (args.length === 0) {
			helpEmbed.setTitle('Dispixel Help:');
			helpEmbed.addField(
				'Here\'s a list of all of the commands available:',
				commands.map(command => command.name).join(', ')
			);
			helpEmbed.addField(
				`You can use ${prefix}help [command] to get information about a specific command.`,
				`e.g. ${prefix}help ping`
			);

			return message.author
				.send(helpEmbed)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply(
						'I\'ve sent you a DM with all my help message and commands!'
					);
				})
				.catch(error => {
					console.error(
						`Could not send help DM to ${message.author.tag}.\n`,
						error
					);
					message.reply('it seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command =
			commands.get(name) ||
			commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		helpEmbed.setTitle(`${capitalize(command.name)} Help`);

		if (command.aliases) {helpEmbed.addField('**Aliases:**', `${command.aliases.join(', ')}`);}
		if (command.description) {helpEmbed.addField('**Description:**', `${command.description}`);}
		if (command.usage) {
			helpEmbed.addField(
				'**Usage:**',
				`${prefix}${command.name} ${command.usage}`
			);
		}

		helpEmbed.addField('**Cooldown:**', `${command.cooldown || 3} second(s)`);

		message.channel.send(helpEmbed);
	},
};
