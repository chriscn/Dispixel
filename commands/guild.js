const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const util = require('../methods');

function sendGuildEmbed(message, guild) {
	guild.members.forEach(member => {
		if (member != null) {
			if (['Guild Master', 'GUILDMASTER'].indexOf(member.rank) > -1) {
				hypixeljs.getPlayer.byUuid(member.uuid, (err, player) => {
					if (err) console.error(err);
					guild.master = player.displayname;

					message.channel.send(new Discord.RichEmbed()
						.setTitle(`${guild.name}`)
						.setURL(`https://hypixel.net/guilds/${guild._id}`)
						.color('#2196F3')
						.setThumbnail(guild.banner ? `https://hypixel.net/data/guild_banners/100x200/${guild._id}.png` : 'https://hypixel.net/styles/hypixel-uix/hypixel/default-guild-banner.png')
						.addField('Guild Master:', guild.master, true)
						.addField('Members:', guild.members.length, true)
						.addField('Level:', util.guildLevel(guild.exp), true)
						.addField('Experience:', util.numberWithCommas(guild.exp), true)
						.addField('Legacy Rank:', guild.legacyRanking != undefined ? util.addSuffix(util.numberWithCommas(guild.legacyRanking)) : 'Unknown')
						.addField('Created At:', util.formatAPITime(guild.created))
					);
				});
			}
		}
	});
}

module.exports = {
	name: 'guild',
	description: 'Gets information about a certain guild.',
	args: true,
	execute(message, args) {
		if (args[0].match(/[a-f0-9]{24}/) && args.length === 1) {
			hypixeljs.getGuild.byId(args[0], (err, guild) => {
				if (err) console.error(err);
				if (guild == null) message.reply('that guild doesn\'t exist. Perhaps you should create it?');
				sendGuildEmbed(message, guild);
			});
		} else {
			hypixeljs.getGuild.byName(args.join(' '), (err, guild) => {
				if (err) console.error(err);
				if (guild == null) return message.reply('that guild doesn\'t exist. Perhaps you should create it?');
				sendGuildEmbed(message, guild);
			});
		}
	},
};
