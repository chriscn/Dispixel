const mojangjs = require('mojangjs');
const Discord = require('discord.js');

module.exports = {
	name: 'uuid',
	description: 'Gets the UUID of a given player.',
	args: true,
	execute(message, args) {
		if (args.length == 1) {
			mojangjs.getUUID(args[0], (err, uuid) => {
				if (err) console.log(err);
				message.channel.send(new Discord.RichEmbed()
					.setTitle(`**${args[0]}**`)
					.setThumbnail('https://visage.surgeplay.com/face/' + uuid)
					.addField('UUID', uuid)
				);
			});
		} else {

		}
	}
}
