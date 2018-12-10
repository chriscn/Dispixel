const mojangjs = require('mojangjs');
const Discord = require('discord.js');
const moment = require('moment');
const { isValidNickname } = require('../lib/dispixelutil');

function joinNames(playerNameHistory) {
	let allNames = '';
	for (let i = 0; i < playerNameHistory.length; i++) {
		if (i + 1 !== playerNameHistory.length) {
			allNames += playerNameHistory[i].name + ', ';
		} else {
			allNames += playerNameHistory[i].name;
		}
	}
	return allNames;
}

module.exports = {
	name: 'namehistory',
	description: 'Get\'s the name history of a player.',
	args: true,
	usage: '[username]',
	execute(message, args) {
		if (args.length !== 1 || !isValidNickname(args[0])) {
			return message.reply(
				'You must only provide a username after the command.'
			);
		}

		mojangjs
			.getUUID(args[0])
			.then(uuid => {
				mojangjs.nameHistory
					.byUUID(uuid)
					.then(namehistory => {
						const playerHistory = new Discord.RichEmbed()
							.setTitle(`**${args[0]}'s** Name History`)
							.setThumbnail('https://visage.surgeplay.com/face/' + uuid)
							.setColor('#8c7ae6');

						for (
							let i = 0;
							i < (namehistory.length <= 5 ? namehistory.length : 5);
							i++
						) {
							if (namehistory[i].changedToAt === undefined) {
								// the first name registered.
								playerHistory.addField(
									'First Name Registered',
									namehistory[i].name
								);
							} else {
								// all other names.
								playerHistory.addField(
									`Changed on ${moment(
										parseInt(namehistory[i].changedToAt)
									).format('Do MMMM YYYY')}`,
									namehistory[i].name
								);
							}
						}

						if (namehistory.length > 5) {
							playerHistory.addField(
								`${args[0]} has too many names, at ${
									namehistory.length
								} which is more than RichEmbeds can handle.`,
								`All of **${args[0]}'s** names are ${joinNames(namehistory)}`
							);
						}

						message.channel.send(playerHistory);
					})
					.catch(console.error);
			})
			.catch(console.error);
	},
};
