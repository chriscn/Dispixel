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
	usage: 'uuid [playername]',
	execute(message, args) {
		if (args.length === 1) {
			mojangjs.getUUID(args[0], (err, res) => {
				if (err) console.log(err);

				message.channel.send(new Discord.RichEmbed()
					.setTitle(`**${res.name}**'s UUID`)
					.setThumbnail('https://visage.surgeplay.com/face/' + res.id)
					.addField('UUID:', convertTrimmedUUIDToRegular(res.id))
					.addField('Trimmed UUID:', res.id)
				);
			});
		} else {
			message.reply('You must only provide a username after the command.');
		}
	},
};
