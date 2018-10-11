const config = require('../config.json');
const moment = require('moment');
const commands = require('./commandInfo.json');
const Discord = require('discord.js');

module.exports = {
	// Checks if the query is one of the command's numerous names. If it is, it then checks for proper argument lengths then runs the callback method
	isCommand: (query, args, commandName, callback) => {
		const commandData = commands[commandName];
		if (commandData.names.indexOf(query)+1) {
			if (args.length >= commandData.argsMin && args.length <= commandData.argsMax) callback(null);
			else callback(`Invalid usage! Proper usage: \n\`\`\`${config.prefix}${commandData.names[0]} ${commandData.usage}\`\`\``);
		}
	},
	
	// Returns an error message in Discord's MessageEmbed format
	errorEmbed: error => {
		return new Discord.RichEmbed()
			.setTitle('An Error Occurred')
			.setDescription(error)
			.setColor(0xff3300)
			.setThumbnail(config.icons.warning);
	},

	error: (err, message) => {
		message.channel.send(this.errorEmbed(err).catch((err) => console.error(err)));
	},

	// Checks if user is online based on login/logout timestamps
	isOnline: (lastLogin, lastLogout) => {
		return lastLogin > lastLogout ? 'Online' : 'Offline';
	},

	// Fetches network level based on network exp
	networkLevel: networkExp => {
		let REVERSE_PQ_PREFIX = -3.5;
		let REVERSE_CONST = 12.25;
		let GROWTH_DIVIDES_2 = 0.0008;
		return networkExp < 0 ? 1 : Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * networkExp));
	},

	// Fetches guild level based on guild exp
	guildLevel: guildExp => {
		if (guildExp < 100000) return 0;
		else if (guildExp < 250000) return 1;
		else if (guildExp < 500000) return 2;
		else if (guildExp < 1000000) return 3;
		else if (guildExp < 1750000) return 4;
		else if (guildExp < 2750000) return 5;
		else if (guildExp < 4000000) return 6;
		else if (guildExp < 5500000) return 7;
		else if (guildExp < 7500000) return 8;
		else if (guildExp < 10000000) return 9;
		else if (guildExp < 23000000) {
			return 9 + Math.floor((guildExp-7500000)/2500000);
		} else if (guildExp >= 23000000) {
			return 14 + Math.floor((guildExp-20000000)/3000000);
		}
	},

	// Adds commas to a number using the regular expression found here: https://answers.acrobatusers.com/How-to-separate-thousands-with-space-and-adding-2-decimal-places-q282162.aspx
	numberWithCommas: number => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	},

	formatAPITime: timestamp => {
		return moment(timestamp).format('dddd, MMMM, Do YYYY, h:mm:ss a');
	},

	getRank: json => {
		let fullRank;
		let baseRank = 'Default';
		let permRank;
		let displayRank;
		if (json.packageRank) baseRank = replaceRank(json.packageRank);
		if (json.newPackageRank) baseRank = replaceRank(json.newPackageRank);
		if (json.monthlyPackageRank == 'SUPERSTAR') baseRank = 'MVP++';
		if (json.rank && json.rank != 'NORMAL') permRank = json.rank.replace('MODERATOR', 'MOD');
		if (json.prefix) displayRank = json.prefix.replace(/§.|\[|]/g, '');

		function replaceRank(replaceRank) {
			return replaceRank.replace('VIP_PLUS', 'VIP+').replace('MVP_PLUS', 'MVP+').replace('NONE',  'Default');
		}

		fullRank = `**[${baseRank}]**`;
		if (permRank) fullRank = `**[${permRank}]** *(actually ${baseRank})*`;
		if (displayRank) fullRank = `**[${displayRank}]** *(${permRank ? `[${permRank}] ` : ''}actually ${baseRank})*`;
		return fullRank;
	},

	addSuffix: amount => {
		amount = '' + amount;
		const lastChar = amount.slice(-1);
		if (['0','4','5','6','7','8','9'].indexOf(lastChar)+1) amount += 'th';
		if (lastChar == '1') amount += 'st';
		if (lastChar == '2') amount += 'nd';
		if (lastChar == '3') amount += 'rd';
		return amount;
	}
};
