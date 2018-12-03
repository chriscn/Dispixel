const mojangjs = require('mojangjs');
const Discord = require('discord.js');

function convertTrimmedUUIDToRegular(trimmedUUID) {
	let fullUUID = trimmedUUID;
	fullUUID = insert(fullUUID, 8, '-');
	fullUUID = insert(fullUUID, 13, '-');
	fullUUID = insert(fullUUID, 18, '-');
	fullUUID = insert(fullUUID, 23, '-');
	return fullUUID;
}
function insert(str, index, value) {
	return str.substr(0, index) + value + str.substr(index);
}

module.exports = {
	name: 'uuid',
	description: 'Gets the UUID of a given player.',
	args: true,
	usage: '[playername]',
	execute(message, args) {
		if (args.length === 1) {
			mojangjs.getUUID(args[0]).then(res => {
				if (res === undefined) {
					message.reply('that player could not be found.');
				} else {
					message.channel.send(new Discord.RichEmbed()
						.setTitle(`**${args[0]}**'s UUID`)
						.setColor('#44bd32')
						.setThumbnail('https://visage.surgeplay.com/face/' + res)
						.addField('Trimmed UUID:', res)
						.addField('UUID:', convertTrimmedUUIDToRegular(res))
					);
				}
			}).catch(err => console.error(err));
		} else {
			message.reply('You must only provide a username after the command.');
		}
	},
};
