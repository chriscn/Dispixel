const mojangjs = require('mojangjs');
const Discord = require('discord.js');

module.exports = {
	name: 'namehistory',
	description: 'Get\'s the name history of a player.',
	args: true,
	usage: 'namehistory [username]',
	execute(message, args) {
		if (args.length === 1 && args[0] !== undefined) {
			mojangjs.nameHistory.byName(args[0], (err, namehistory) => {
				if (err) console.error(err);
				const playerHistory = new Discord.RichEmbed().setTitle(`**${args[0]}'s** Name History`);

				for (let i = 0; i < namehistory.length; i++) {
					console.log(namehistory[i].);
				}
			});
		} else {
			message.reply('You must only provide a username after the command.');
		}
	},
}
