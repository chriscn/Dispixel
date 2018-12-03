const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const mojangjs = require('mojangjs');
const dispixelutil = require('../lib/dispixelutil');

function sendGuildEmbed(message, guild) {
	guild.members.forEach(member => {
		if (member != null) {
			if (['Guild Master', 'GUILDMASTER'].indexOf(member.rank) > -1) {
				mojangjs.getNameFromUUID(member.uuid).then(res => {
					guild.master = res;

					message.channel.send(new Discord.RichEmbed()
						.setTitle(`${guild.name}`)
						.setURL(`https://hypixel.net/guilds/${guild._id}`)
						.setColor('#2196F3')
						.setThumbnail(guild.banner ? `https://hypixel.net/data/guild_banners/100x200/${guild._id}.png` : 'https://hypixel.net/styles/hypixel-uix/hypixel/default-guild-banner.png')
						.addField('Guild Master:', guild.master, true)
						.addField('Members:', guild.members.length, true)
						.addField('Experience:', dispixelutil.numberWithCommas(guild.exp), true)
						.addField('Legacy Rank:', guild.legacyRanking != undefined ? dispixelutil.addSuffix(dispixelutil.numberWithCommas(guild.legacyRanking)) : 'Unknown')
						.addField('Created At:', dispixelutil.formatAPITime(guild.created))
					);
				}).catch(err => console.error(err));
			}
		}
	});
}

module.exports = {
	name: 'guild',
	description: 'Gets information about a certain guild.',
	usage: '[name/ID]',
	args: true,
	execute(message, args) {
		if (args[0].match(/[a-f0-9]{24}/) && args.length === 1) {
			hypixeljs.getGuild.byId(args[0]).then(guild => {
				if (guild == null) message.reply('that guild doesn\'t exist. Perhaps you should create it?');
				sendGuildEmbed(message, guild);
			}).catch(err => console.error(err));
		} else {
			hypixeljs.getGuild.byName(args.join(' ')).then(guild => {
				if (guild == null) return message.reply('that guild doesn\'t exist. Perhaps you should create it?');
				sendGuildEmbed(message, guild);
			}).catch(err => console.error(err));
		}
	},
};
