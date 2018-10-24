const hypixeljs = require('hypixeljs');
const Discord = require('discord.js');
const fs = require('fs');
const request = require('request');

const gameConversion = JSON.parse(fs.readFileSync('./files/gameconversion.json').toString());
const allGames = Object.keys(gameConversion);

function getEndpointGame(reference) {
	return gameConversion[reference.toLocaleLowerCase()];
}

function uuidToUsername(uuid) {
	if (uuid != null) {
		request(`https://api.mojang.com/user/profiles/${uuid}/names`, { json: true }, function(err, res, body) {
			if (err) console.error(err);
			if (res.statusCode === 200 && !err) {
				return body[(body.length - 1)].name;
			}
		});
	}
}

module.exports = {
	name: 'leaderboard',
	description: 'Get\'s the most up to date leaderboards.',
	usage: '-leaderboard [gametype]',
	args: true,
	execute(message, args) {
		if (allGames.indexOf(args[0]) > -1) {
			if (getEndpointGame(args[0]) !== null) { // checks to make sure we support the game and have conversion for it.
				hypixeljs.getLeaderboards((err, res) => {
					if (err) console.error(err);
					const leaderboardEmbed = new Discord.RichEmbed().setTitle(`${args[0]} leaderboard:`).setColor('#7f8fa6');
					const gameLeaderboard = res[getEndpointGame(args[0])];
					if (gameLeaderboard != null) {
						gameLeaderboard.forEach(individualLeaderboard => {
							const gameLeaders_UUID = individualLeaderboard.leaders;
							const gameLeaders_username = [];

							gameLeaders_UUID.forEach(leader_uuid => gameLeaders_username.push(uuidToUsername(leader_uuid)));
							leaderboardEmbed.addField(`${individualLeaderboard.prefix} ${individualLeaderboard.title}`, gameLeaders_UUID.join(', '));
						});

						message.channel.send(leaderboardEmbed);
					} else {
						console.error(`${args[0]} should be within the supported game types, but is not supported by the API. Did a game get removed?`);
					}
				});
			} else {
				console.error(`${args[0]} should be within the supported game types, but is not supported by the API. Did a game get removed?`);
			}
		} else {

			message.channel.send(new Discord.RichEmbed()
				.setTitle(`Unknown Game Type **${args[0]}**`)
				.setColor('#e84118')
				.addField('Available Game Types:', allGames.join(', '))
			);
		}
	},
};
