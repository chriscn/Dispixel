const Discord = require('discord.js');
const mojangjs = require('mojangjs');
const { isValidNickname } = require('../lib/dispixelutil');

module.exports = {
	name: 'skin',
	description: 'Gets the skin of a player.',
	args: true,
	usage: '[playername]',
	execute(message, args) {
		if (args.length !== 1) {
			return message.reply(
				'You must only provide a username after this command.'
			);
		}

		const nickname = args[0];

		if (!isValidNickname(nickname)) {
			return message.reply(
				'The username is too long, Minecraft usernames can only be 16 characters'
			);
		}

		mojangjs
			.getUUID(nickname)
			.then(uuid => {
				console.log(uuid);
				message.channel.send(
					new Discord.RichEmbed()
						.setTitle(`${nickname}'s Skin`)
						.addField(`${nickname}'s UUID`, uuid)
						.setImage(`https://visage.surgeplay.com/full/${uuid.toString()}`)
				);
			})
			.catch(console.error);
	},
};
