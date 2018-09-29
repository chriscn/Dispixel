module.exports = {
	listen: (bot, prefix, util) => {
		bot.on('message', (message) => {
			if (!message.content.startsWith(prefix) || message.author.bot) return; // making sure that we are doing our command.

			const args = message.content.replace(prefix, '').trim().split(/ +/g);
			const cmd = args.shift().toLocaleLowerCase();

			util.isCommand(cmd, args, 'ping', (err) => {
				if (err) util.error(err, message.channel);
				message.channel.send(`Pong! ${Math.floor(bot.ping)}ms`);
			});
		});
	}
};
