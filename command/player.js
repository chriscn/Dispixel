const hypixeljs = require('hypixeljs');
const Discord = require('discord.js');

function sendPlayerEmbed(player) {
	return new Discord.RichEmbed()
		.setTitle(`${player.displayname}'s Stats`)
		.addField('Karma:', player.karma ? player.karma : 0, true);
}


module.exports = {
	name: 'player',
	description: 'Get detailed information about a player using the Hypixel API',
	args: true,
	cooldown: 10,
	execute(message, args) {
		if (args[0].length <= 16) {
			hypixeljs.getPlayer.byName(args[0], (err, json) => {
				if (err) console.error(err);
				message.channel.send(sendPlayerEmbed(json));
			});
		} else if (args[0].match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)) {
			hypixeljs.getPlayer.byUuid(args[0], (err, json) => {
				if (err) console.error(err);
				message.channel.send(sendPlayerEmbed(json));
			});
		} else {
			message.reply(`the player name provided ${args[0]} was not valid as it was more than sixteen characters.`);
		}
	},
};
