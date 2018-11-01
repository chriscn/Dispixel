const Discord = require('discord.js');

module.exprots = {
	name: 'volt',
	usage: 'volt',
	description: 'volt',
	execute(message) {
		message.channel.send(new Discord.RichEmbed().setTitle('Volt').setColor('#2ecc71').addField('Guild Thread', '[Click Here](https://hypixel.net/threads/guild-social-friendly-volt.627408/)'));
	},
}
