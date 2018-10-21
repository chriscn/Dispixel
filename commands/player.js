const hypixeljs = require('hypixeljs');
const Discord = require('discord.js');
const util = require('../methods');

function sendPlayerEmbed(player) {
	return new Discord.RichEmbed()
		.setTitle(`${player.displayname} **(Currently ${util.isOnline(player.lastLogin, player.lastLogout)})**`)
		.setThumbnail('https://visage.surgeplay.com/face/' + player.uuid)
		.addField('Rank:', util.getRank(player), true)
		.addField('Level:', util.networkLevel(player.networkExp), true)
		.addField('Karma:', player.karma ? util.numberWithCommas(player.karma) : 0, true)
		.addField('Achievement Points:', player.achievementPoints ? util.numberWithCommas(player.achievementPoints) : 0, true)
		.addField('Joined:', !player.firstlogin ? util.formatAPITime(player.firstlogin) : 'Hasn\'t Joined', true);
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
		} else if (args[0].match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/) || args[0].match(/[0-9a-f]{32}/)) { // tests against a full uuid or a trimmed uuid
			hypixeljs.getPlayer.byUuid(args[0], (err, json) => {
				if (err) console.error(err);
				message.channel.send(sendPlayerEmbed(json));
			});
		} else {
			message.reply(`the player name provided ${args[0]} was not valid as it was more than sixteen characters and wasn't in a UUID format. We do support UUIDs!`);
		}
	},
};
