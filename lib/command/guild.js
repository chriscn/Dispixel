const Discord = require('discord.js');

module.exports = {
	listen: (bot, prefix, util, hypixel) => {
		bot.on('message', (message) => {
			if (!message.content.startsWith(prefix) || message.author.bot) return;

			const args = message.content.replace(prefix, '').trim().split(/ +/g);
			const cmd = args.shift().toLocaleLowerCase();

			util.isCommand(cmd, [args.join(' ')], 'guild', (err) => {
				if (err) return console.error(err);

				hypixel.getGuild.byName(args.join(' '), (err, guild) => {
					if (err) return console.error(err);

					guild.members.forEach(member => {
						if (['GUILDMASTER', 'Guild Master'].indexOf(member.rank) + 1) hypixel.getPlayer.byUuid(member.uuid, (err, player) => {
							if (err) return console.error(err);

							guild.master = player.displayName;
							sendGuildEmbed(guild);
						});
					});

					function sendGuildEmbed(guild) {
						const guildEmbed = new Discord.RichEmbed()
							.setTitle(`${guild.tag ? `[${guild.tag}] ` : ''}${guild.name}`)
							.setURL(`https://hypixel.net/guilds/${guild._id}`)
							.setThumbnail(guild.banner ? `https://hypixel.net/data/guild_banners/100x200/${guild._id}.png` : 'https://hypixel.net/styles/hypixel-uix/hypixel/default-guild-banner.png')
							.addField('Guild Master:', guild.master, true)
							.addField('Members:', guild.members.length, true)
							.addField('Level:', util.guildLevel(guild.exp), true)
							.addField('Experience:', util.numberWithCommas(guild.exp), true)
							.addField('Legacy Rank:', guild.legacyRanking != undefined ? util.addSuffix(util.numberWithCommas(guild.legacyRanking)) : 'Unknown')
							.addField('Created At:', util.formatAPITime(guild.created));
						message.channel.send(guildEmbed);
					}
				});
			});
		});
	}
}

			/*util.isCommand(cmd, [args.join(' ')], 'guild', (err) => {
				if (err) return console.error(err);
				hypixel.getGuild.byName(args.join(' '), (err, guild) => {
					if (err) return console.error(err);
					guild.members.forEach(member => {
						if (['GUILDMASTER', 'Guild Master'].indexOf(member.rank)+1) hypixel.getPlayer.byUuid(member.uuid, (err, player) => {
							if (err) return console.error(err);
							guild.master = player.displayname;
							sendGuildEmbed(guild);
						});
					});
				});
				function sendGuildEmbed(guild) {
					const guildEmbed = new Discord.RichEmbed()
						.setTitle(`${guild.tag ? `[${guild.tag}] ` : ''}${guild.name}`)
						.setURL(`https://hypixel.net/guilds/${guild._id}`)
						.setThumbnail(guild.banner ? `https://hypixel.net/data/guild_banners/100x200/${guild._id}.png` : 'https://hypixel.net/styles/hypixel-uix/hypixel/default-guild-banner.png')
						.addField('Guild Master:', guild.master, true)
						.addField('Members:', guild.members.length, true)
						.addField('Level:', util.guildLevel(guild.exp), true)
						.addField('Experience:', util.numberWithCommas(guild.exp), true)
						.addField('Legacy Rank:', guild.legacyRanking != undefined ? util.addSuffix(util.numberWithCommas(guild.legacyRanking)) : 'Unknown')
						.addField('Created At:', util.formatAPITime(guild.created));
					message.channel.send(guildEmbed);
				}
			});
		});*/
