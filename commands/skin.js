const Discord = require('discord.js');
const mojangjs = require('mojangjs');

module.exports = {
	name: 'skin',
	description: 'Gets the skin of a player.',
	args: true,
	usage: '[playername]',
	execute(message, args) {
		if (args.length === 1) {
			if (args[0] > 16) {
				message.reply('The username is too long, Minecraft usernames can only be 16 characters');
			} else {
				mojangjs.getUUID(args[0]).then(uuid => {
					console.log(uuid);
					message.channel.send(new Discord.RichEmbed()
						.setTitle(`${args[0]}'s Skin`)
						.addField(`${args[0]}'s UUID`, uuid)
						.setImage(`https://visage.surgeplay.com/full/${uuid.toString()}`)
					).then();
				}).catch(err => console.error(err));
			}
		} else {
			message.reply('You must only provide a username after this command.');
		}
	},
}
