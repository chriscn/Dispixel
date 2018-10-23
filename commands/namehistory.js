const mojangjs = require('mojangjs');
const Discord = require('discord.js');
const methods = require('../methods.js');

module.exports = {
	name: 'namehistory',
	description: 'Get\'s the name history of a player.',
	args: true,
	usage: 'namehistory [username]',
	execute(message, args) {
		if (args.length === 1 && args[0] !== undefined) {
			mojangjs.nameHistory.byName(args[0], (err, namehistory) => {
				if (err) console.error(err);
				const playerHistory = new Discord.RichEmbed()
					.setTitle(`**${args[0]}'s** Name History`)
					.setColor('#8c7ae6');

				mojangjs.getUUID(args[0], (err, uuid) => {
					if (err) console.error(err);
					console.log(uuid.id);
					playerHistory.setThumbnail('https://visage.surgeplay.com/face/' + uuid.id);
				});

				for (let i = 0; i < namehistory.length; i++) {
					if (namehistory[i].changedToAt === undefined) {
						// the first name registered.
						playerHistory.addField('First Name Registered', namehistory[i].name);
					} else {
						// all other names.
						playerHistory.addField(`Changed at ${methods.formatAPITime(namehistory[i].changedToAt)}`, namehistory[i].name);
					}
				}
 				message.channel.send(playerHistory);
			});
		} else {
			message.reply('You must only provide a username after the command.');
		}
	},
};
