const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const util = require('util');

module.exports = {
	name: 'hpinfo',
	description: 'Gets information about the Hypixel Network - player count, watchdog etc.',
	usage: 'hpinfo',
	args: false,
	execute(message) {
		let currentPlayers = 0;
		(async () => {
			const getOnlinePlayers = util.promisify(hypixeljs.playersOnline);
			try {
				currentPlayers = getOnlinePlayers;
			} catch (err) {
				console.error(err);
			}
		})();

		()


		message.channel.send(
			new Discord.RichEmbed()
				.setTitle('Hypixel Information')
				.addField('Current Players Online', currentPlayers)

		)
	},
}
