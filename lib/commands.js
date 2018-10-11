const config = require('../config.json');
const keys = require('../key.json').hypixel_api_keys;
const hypixel = require('hypixeljs');
const util = require('./util.js');
const Discord = require('discord.js');


function listen(bot) {
	bot.on('message', (message) => {
		if (!(new RegExp(`^${config.prefix}[A-Za-z0-9]+(.*)$`).test(message.content)) || message.author.bot) return;

		if ()

		const args = message.content.replace(config.prefix, '').trim().split(/ +/g),
			cmd = args.shift().toLowerCase();

		const channel = message.channel;
		const content = message.cleanContent;
		const author = message.author;
		const member = message.member;
		const guild = message.guild;
		function error(err) {
			util.error(err)
			channel.send(console.errorEmbed(err)).catch((err) => console.log(err));
		}
		//Commands, what fun


		//Fetches a player's stats
		util.isCommand(cmd, args, 'player', (err) => {
			if (err) return util.error(err, "Command invalid.");
			if (args[0].length > 16) return hypixel.getPlayer.byUuid(args[0], (err, player) => {
				if (err) return util.error(err, "Invalid UUID.");
				sendPlayerEmbed(player);
			});
			hypixel.getPlayer.byName(args[0], (err, player) => {
				if (err) return util.error(err, "Hypixel API returned an error");
				sendPlayerEmbed(player);
			});
			function sendPlayerEmbed(player) {
				const playerEmbed = new Discord.RichEmbed()
					.setTitle(`${player.displayname} **(Currently ${util.isOnline(player.lastLogin, player.lastLogout)})**`)
					.setThumbnail('https://visage.surgeplay.com/face/' + player.uuid)
					.addField('Rank:', util.getRank(player), true)
					.addField('Level:', util.networkLevel(player.networkExp), true)
					.addField('Karma:', player.karma ? util.numberWithCommas(player.karma) : 0, true)
					.addField('Achievement Points:', player.achievementPoints ? util.numberWithCommas(player.achievementPoints) : 0, true)
					.addField('Joined:', ! player.firstJoined ? util.formatAPITime(player.firstJoined) : 'Hasn\'t Joined', true);
				channel.send(playerEmbed);
			}
		})


		//Fetches a guild's stats
		/**util.isCommand(cmd, [args.join(' ')], 'guild', (err) => {
			if (err) return error(err);
			hypixel.getGuild.byName(args.join(' '), (err, guild) => {
				if (err) return error(err);
				guild.members.forEach(member => {
					if (['GUILDMASTER', 'Guild Master'].indexOf(member.rank)+1) hypixel.getPlayer.byUuid(member.uuid, (err, player) => {
						if (err) return error(err);
						guild.master = player.displayname;
						sendGuildEmbed(guild);
					});
				});
			});
			function sendGuildEmbed(guild) {
				const guildEmbed = new Discord.RichEmbed()
					.setTitle(`${guild.tag ? `[${guild.tag}] `: ''}${guild.name}`)
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
		});*/

		//OP Commands

	});
}

module.exports = {listen: bot => listen(bot)};
