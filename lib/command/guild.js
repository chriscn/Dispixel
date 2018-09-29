module.exports = {
	listen: (bot, prefix, util, hypixel) => {
		bot.on('message', (message) => {
			if (!message.content.startsWith(prefix) || message.author.bot) return;

			const args = message.content.replace(prefix, '').trim().split(/ +/g);
			const cmd = args.shift().toLocaleLowerCase();

			util.isCommand(cmd, [args.join(' ')], 'guild', (err) => {
				if (err) return util.error(err);
			});
		});
	}
};
