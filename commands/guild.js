const Discord = require('discord.js');
const hypixeljs = require('hypixeljs');
const util = require('../methods');

function getGuildEmbed(guild) {
	let guildMaster = '';

	for (let i = 0; i < guild.members.length; i++) {
		if (guild.members[i] != null) {
			console.log(`On member ${guild.members[i].uuid} which is number ${i}`);
			if (['GUILDMASTER', 'Guild Master'].indexOf(guild.members[i].rank) >= 0) {
				console.log(`The player ${guild.members[i].uuid} is the guild master.`);
				hypixeljs.getPlayer.byUuid(guild.members[i].uuid, (err, player) => {
					if (err) console.error(err);
					console.log(`The guild masters username is ${player.displayname}`);
					guildMaster = player.displayname;
				});
			}
		}
	}

	//{ uuid: '365678b8c0944feba58ed3b1488d106b',
	//   rank: 'Guild Master',
	//   joined: 1455213421874,
	//   questParticipation: 4 }

	if (guildMaster === '' || guildMaster === undefined || guildMaster == null) guildMaster = 'You fucked up.';

	return new Discord.RichEmbed()
		.setTitle(`${guild.name}`)
		.setURL(`https://hypixel.net/guilds/${guild._id}`)
		.setThumbnail(guild.banner ? `https://hypixel.net/data/guild_banners/100x200/${guild._id}.png` : 'https://hypixel.net/styles/hypixel-uix/hypixel/default-guild-banner.png')
		.addField('Guild Master:', guildMaster, true)
		.addField('Members:', guild.members.length, true)
		.addField('Level:', util.guildLevel(guild.exp), true)
		.addField('Experience:', util.numberWithCommas(guild.exp), true)
		.addField('Legacy Rank:', guild.legacyRanking != undefined ? util.addSuffix(util.numberWithCommas(guild.legacyRanking)) : 'Unknown')
		.addField('Created At:', util.formatAPITime(guild.created));
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
				message.channel.send(getGuildEmbed(guild));
			});
		} else {
			hypixeljs.getGuild.byName(args.join(' '), (err, guild) => {
				if (err) console.error(err);
				if (guild == null) return message.reply('that guild doesn\'t exist. Perhaps you should create it?');
				message.channel.send(getGuildEmbed(guild));
			});
		}
	},
};
