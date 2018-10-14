const hypixeljs = require('hypixeljs');
const { developer } = require('../config.json');
const { hypixel_api_keys } = require('../key.json');

module.exports = {
	name: 'requests',
	description: 'Get how many requests we have remaining for our Hypixel API Keys',
	execute(message) {
		if (developer.indexOf(message.author.id) > -1) {
			message.channel.send(`${(hypixel_api_keys.length * 120) - hypixeljs.recentRequests()}/${hypixel_api_keys.length * 120} request(s) remaining.`);
		} else {
			message.reply('you must be a developer to use this command.');
		}
	},
};
