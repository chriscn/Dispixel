const hypixeljs = require('hypixeljs');
const Discord = require('discord.js');
const {
	isOnline,
	getRank,
	networkLevel,
	numberWithCommas,
	formatAPITime,
	isValidNickname,
	isValidUuid,
} = require('../lib/dispixelutil');

function getPlayerEmbed(player) {
	return new Discord.RichEmbed()
		.setTitle(
			`${player.displayname} **(Currently ${isOnline(
				player.lastLogin,
				player.lastLogout
			)})**`
		)
		.setThumbnail('https://visage.surgeplay.com/face/' + player.uuid)
		.addField('Rank:', getRank(player), true)
		.addField('Level:', networkLevel(player.networkExp), true)
		.addField('Karma:', player.karma ? numberWithCommas(player.karma) : 0, true)
		.addField(
			'Achievement Points:',
			player.achievementPoints ? numberWithCommas(player.achievementPoints) : 0,
			true
		)
		.addField(
			'Joined:',
			player.firstLogin ? formatAPITime(player.firstLogin) : 'Hasn\'t Joined',
			true
		);
}

module.exports = {
	name: 'player',
	description: 'Get detailed information about a player using the Hypixel API',
	args: true,
	usage: '[username/UUID]',
	cooldown: 10,
	execute(message, args) {
		const input = args[0];

		if (!isValidNickname(input) && !isValidUuid(input)) {
			return message.reply(
				`the player name provided ${input} was not valid as it was more than sixteen characters and wasn't in a UUID format. We do support UUIDs!`
			);
		}

		const promise = isValidNickname(input)
			? hypixeljs.getPlayer.byName(input)
			: hypixeljs.getPlayer.byUuid(input);

		promise
			.then(json => message.channel.send(getPlayerEmbed(json)))
			.catch(console.error);
	},
};
