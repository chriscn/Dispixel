const Discord = require('discord.js');

module.exprots = {
	name: 'volt',
	usage: 'volt',
	description: 'volt',
	execute(message) {
		if (message.guild.id === 148197843025395712) {
			message.channel.send(new Discord.RichEmbed().setTitle('Volt').setColor('#2ecc71').addField('Guild Thread', '[Click Here](https://hypixel.net/threads/guild-social-friendly-volt.627408/)'));
		} else {
			message.reply('that command can only be run within the Volt discord. [Invite Here](https://discord.me/volt)');
		}
	},
};
