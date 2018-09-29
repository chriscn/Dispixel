const util = require('../util.js');
const config = require('../../config.json');

module.exports = {
	listen: (bot) => {
		bot.on('message', (message) => {
			if (message.content.startsWith(config.prefix) || message.author.bot) return; // making sure that we are doing our commands.

			const args = message.content.replace(config.prefix, '').trim().split(/ +/g);
			const cmd = args.shift().toLocaleLowerCase();

			util.isCommand(cmd, args, 'ping', (err) => {
				if (err) {
					console.error(err);
				}
				message.channel.send(`Pong! ${Math.floor(bot.ping)}ms`);
			});
		});
	}
};
