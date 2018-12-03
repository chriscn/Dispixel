import app from app.js

const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const {
	hypixel_api_keys
} = require('../key.json');

module.exports = {
	name: 'info',
	description: 'Tells you information about Dispixel and the Developer!',
	usage: 'info',
	args: false,
	execute(message) {
		message.channel.send(new Discord.RichEmbed()
			.setTitle('Dispixel Information')
			.addField('Active in' + Discord.Client().guilds.size + 'discord servers!')
			.addField('Created by Thorin')
			.setThumbnail('https://github.com/ConorTheDev/Dispixel/blob/develop/Dispixel.jpg?raw=true')
			.setColor('#c7a153')
		);
	},
};