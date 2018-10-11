const hypixel = require('hypixeljs');
const keys = require('../../key.json');

module.exports = {
	listen: (bot, prefix, util) => {
		bot.on('message', (message) => {
			if (!message.content.startsWith(prefix) || message.author.bot) return; // making sure that we are doing our command.

			const args = message.content.replace(prefix, '').trim().split(/ +/g);
			const cmd = args.shift().toLocaleLowerCase();

			util.isCommand(cmd, args, 'ping', (err) => {
				if (err) console.error(err);
				message.channel.send(`Pong! ${Math.floor(bot.ping)}ms`);
			});

			util.isCommand(cmd, args, 'requests', (err) => {
				if (err) console.error(err);
				if (['140843771075100672'].indexOf(message.author.id) > -1) {
					message.channel.send(`${hypixel.recentRequests()} + requests made in the last minutee. ${(keys.hypixel_api_keys*120)-hypixel.recentRequests()} remaining!`);
				} else {
					util.errorEmbed('Only a Developer can use this command.');
				}
			});
		});
	}
};
