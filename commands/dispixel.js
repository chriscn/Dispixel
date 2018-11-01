const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const { hypixel_api_keys } = require('../key.json');
const config = require('../config.json');

module.exports = {
	name: 'dispixel',
	description: 'Dispixel Bot Information',
	execute(message) {
		message.channel.send(
			new Discord.RichEmbed()
				.setTitle('Dispixel')
				.setDescription('Dispixel was made with love by [Thorin](https://thorindev.co.uk)!')
				.setColor('#2c3e50')
				.addField('Hypixel API Requests', `We have ${(hypixel_api_keys.length * 120) - hypixeljs.recentRequests()}/${hypixel_api_keys.length * 120} request(s) remaining.`)
				.addField('Dispixel Support', '[Availabel Here](https://discord.gg/eGUauNV)')
				.setFooter('Dispixel', config.icons.default)
		);
	},
}
