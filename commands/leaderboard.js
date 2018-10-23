const hypixeljs = require('hypixeljs');
const Discord = require('discord.js');
const fs = require('fs');

const gameConversion = JSON.parse(fs.readFileSync('./files/gameconversion.json').toString());
const allGames = Object.keys(gameConversion);

function captalise(string) {
	const lowercase = string.toString().toLocaleLowerCase();
	return lowercase.charAt(0).toLocaleLowerCase() + lowercase.slice(1);
}

function convertGameType(userGameType) {
	return gameConversion[userGameType.toLocaleLowerCase()];
}

module.exports = {
	name: 'leaderboard',
	description: 'A command to see the leaderboards of all the entire games.',
	args: true,
	execute(message, args) {
		if (allGames.indexOf(args[0]) > -1) {
			const apiGame = convertGameType(args[0]);
			const userfriendlyGame = captalise(args[0]);
		} else {
			message.channel.send(new Discord.RichEmbed()
				.setTitle(`Unknown Game Type: **${args[0]}**`)
				.setColor('#e84118')
				.addField('Available Game Types:', allGames.join(', '))
			);
		}
	},
};
