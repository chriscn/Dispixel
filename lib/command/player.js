const Discord = require('discord.js');

module.exports = {
	listen: (bot, prefix, util, hypixel) => {
		bot.on('message', (message) => {
			if (!message.content.startsWith(prefix) || message.author.bot) return;

			const args = message.content.replace(prefix, '').trim().split(/ +/g);
			const cmd = args.shift().toLocaleLowerCase();

			util.isCommand(cmd, [args.join(' ')], 'player', (err) => {
				if (err) util.error(err, message.channel);

				hypixel.getPlayer.byName(args[0], (err, player) => {
					if (err) return util.error(err);
					sendPlayerEmbed(player);
				});

				function sendPlayerEmbed(player) {
					const playerEmbed = new Discord.RichEmbed()
						.setTitle(`${player.displayName} **(Currently ${util.isOnline(player.lastLogin, player.lastLogout)})**`)
						.setThumbnail('https://visage.surgeplay.com/face/' + player.uuid)
						.addField('Rank:', util.getRank(player), true)
						.addField('Level:', util.networkLevel(player.networkExp), true)
						.addField('Karma:', player.karma ? util.numberWithCommas(player.karma) : 0, true)
						.addField('Achievement Points:', player.achievementPoints ? util.numberWithCommas(player.achievementPoints) : 0, true)
						.addField('Joined:', ! player.firstJoined ? util.formatAPITime(player.firstJoined) : 'Hasn\'t Joined', true);
					message.channel.send(playerEmbed);
				}
			});
		});
	}
};
