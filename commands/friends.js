const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const mojangjs = require('mojangjs');
const util = require('util');

module.exports = {
	name: 'friends',
	usage: '[username/uuid]',
	description: 'Gets the friends of a player.',
	execute(message, args) {
		if (args[0].length <= 16) {
			mojangjs.getUUID(args[0], (err, uuid) => {
				if (err) console.error(err);
				hypixeljs.getFriends(uuid, (err, friends) => {
					if (err) console.error(err);
					let msg = '';
					friends.forEach(friend => {
						msg += `${friend._id}, `;
					});
					message.channel.send(msg);
				});
			});
		} else {
			message.reply(`The player ${args[0]} does not exist as it is longer than 16 characters. Double check the spelling!`);
		}
	},
};
