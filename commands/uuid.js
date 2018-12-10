const mojangjs = require('mojangjs');
const Discord = require('discord.js');
const { formatTrimmedUuid } = require('../lib/dispixelutil');

module.exports = {
	name: 'uuid',
	description: 'Gets the UUID of a given player.',
	args: true,
	usage: '[playername]',
	execute(message, args) {
		if (args.length !== 1) {
			return message.reply(
				'You must only provide a username after the command.'
			);
		}

		const playerNickname = args[0];

		mojangjs
			.getUUID(playerNickname)
			.then(trimmedUuid => {
				if (!trimmedUuid) {
					return message.reply('that player could not be found.');
				}

				message.channel.send(
					new Discord.RichEmbed()
						.setTitle(`**${playerNickname}**'s UUID`)
						.setColor('#44bd32')
						.setThumbnail('https://visage.surgeplay.com/face/' + trimmedUuid)
						.addField('Trimmed UUID:', trimmedUuid)
						.addField('UUID:', formatTrimmedUuid(trimmedUuid))
				);
			})
			.catch(console.error);
	},
};
