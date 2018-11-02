const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const { hypixel_api_keys } = require('../key.json');

module.exports = {
	name: 'hpinfo',
	description: 'Gets information about the Hypixel Network - player count, watchdog etc.',
	usage: 'hpinfo',
	args: false,
	execute(message) {
		let allerrors;
		hypixeljs.playersOnline((err, playersOnline) => {
			allerrors += err;
			hypixeljs.watchdog((err, watchdog) => {
				allerrors += err;
				if (allerrors) console.error(err);
				message.channel.send(new Discord.RichEmbed()
					.setTitle('Hypixel Information')
					.addField('Players Online', `There are ${playersOnline} players online`)
					.addField('Watchdog Stats', `Today Watchdog has banned ${watchdog.watchdog_rollingDaily} players, out of ${watchdog.watchdog_total} players total.`)
					.addField('Hypixel API Requests', `${(hypixel_api_keys.length * 120) - parseInt(hypixeljs.recentRequests)}/${hypixel_api_keys.length * 120} request(s) remaining.`)
					.setThumbnail('https://i.imgur.com/14648Pn.png')
					.setColor('#c7a153')
				);
			});
		});
	},
};
