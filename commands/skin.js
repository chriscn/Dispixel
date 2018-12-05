const Discord = require('discord.js');
const mojangjs = require('mojangjs');
const dispixelutil = require('../lib/dispixelutil');

module.exports = {
	name: 'skin',
	description: 'Gets the skin of a player.',
	args: true,
	usage: '[playername]',
	execute(message, args) {
		if (args.length === 1) {
			if (!dispixelutil.isValidNickname(args[0])) {
				message.reply(
					'The username is too long, Minecraft usernames can only be 16 characters'
				);
			} else {
				mojangjs
					.getUUID(args[0])
					.then(uuid => {
						console.log(uuid);
						message.channel.send(
							new Discord.RichEmbed()
								.setTitle(`${args[0]}'s Skin`)
								.addField(`${args[0]}'s UUID`, uuid)
								.setImage(
									`https://visage.surgeplay.com/full/${uuid.toString()}`
								)
						);
					})
					.catch(console.error);
			}
		} else {
			message.reply('You must only provide a username after this command.');
		}
	},
};
