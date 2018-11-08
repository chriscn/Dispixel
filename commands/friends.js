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
				//	console.log(JSON.stringify(friends));
					if (friends != null) {
						(async () => {
							const getNameFromUUID = util.promisify(mojangjs.getNameFromUUID);
							try {
								const playerUsernames = await Promise.all(friends.map(member => getNameFromUUID(member._id)));
								message.channel.send(playerUsernames);
							} catch (err) {
								// handle err
								console.error(err);
							}
						})();
					} else {
						message.channel.send(`The player ${args[0]} doesn't have any friends :(`);
					}
				});
			});
		} else {
			message.reply(`The player ${args[0]} does not exist as it is longer than 16 characters. Double check the spelling!`);
		}
	},
};
