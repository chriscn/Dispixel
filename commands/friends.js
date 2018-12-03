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
			mojangjs.getUUID(args[0]).then(uuid => {
				hypixeljs.getFriends(uuid).then(friends => {
					if (friends != null) {
						message.channel.send(`Fetching friends for ${args[0]}`).then(msg => {
							msg.edit('Updated Message');
						});
					}
				});
			}).catch(err => console.error(err));
		} else {
			message.reply(`The player ${args[0]} does not exist as it is longer than 16 characters. Double check the spelling!`);
		}
	},
};
