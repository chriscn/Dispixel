const mojangjs = require('mojangjs');
const Discord = require('discord.js');

module.exports = {
	name: 'uuid',
	description: 'Gets the UUID of a given player.',
	args: true,
	usage: 'uuid [playername]',
	execute(message, args) {
		if (args.length === 1) {
			mojangjs.getUUID(args[0], (err, res) => {
				if (err) console.log(err);

				message.channel.send(new Discord.RichEmbed()
					.setTitle(`**${res.name}**'s UUID`)
					.setColor('#44bd32')
					.setThumbnail('https://visage.surgeplay.com/face/' + res)
					.addField('Trimmed UUID:', res.id)
				);
			});
		} else {
			message.reply('You must only provide a username after the command.');
		}
	},
};
