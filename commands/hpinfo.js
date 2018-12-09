const util = require('../lib/dispixelutil.js');
const hypixeljs = require('hypixeljs');
const { hypixel_api_keys } = require('../key.json');

module.exports = {
	name: 'hpinfo',
	description:
		'Gets information about the Hypixel Network - player count, watchdog etc.',
	usage: 'hpinfo',
	args: false,
	execute(message) {
		hypixeljs
			.playersOnline()
			.then(playersOnline => {
				hypixeljs
					.watchdog()
					.then(watchdog => {
						message.channel.send(
							util
								.richEmbed()
								.setTitle('Hypixel Information')
								.addField(
									'Players Online',
									`There are ${playersOnline} players online`
								)
								.addField(
									'Watchdog Stats',
									`Today Watchdog has banned ${
										watchdog.watchdog_rollingDaily
									} players, out of ${watchdog.watchdog_total} players total.`
								)
								.addField(
									'Hypixel API Requests',
									`${hypixel_api_keys.length * 120 -
										hypixeljs.recentRequests}/${hypixel_api_keys.length *
										120} request(s) remaining.`
								)
								.setThumbnail('https://i.imgur.com/14648Pn.png')
								.setColor('#c7a153')
						);
					})
					.catch(console.error);
			})
			.catch(console.error);
	},
};
