const Discord = require('discord.js');
const { logoUrl } = require('../config.json');

module.exports = {
	name: 'info',
	description: 'Tells you information about Dispixel and the Developer!',
	usage: 'info',
	args: false,
	execute(message, args, bot) {
		message.channel.send(
			new Discord.RichEmbed()
				.setTitle('Dispixel Information')
				.addField(`Active in ${bot.guilds.size} discord servers!`)
				.addField('Created by Thorin')
				.setThumbnail(logoUrl)
				.setColor('#c7a153')
		);
	},
};
