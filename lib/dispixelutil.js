const moment = require('moment');
const Discord = require('discord.js');
const { logoUrl } = require('../config.json');

const NICKNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;
const FULL_UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SIMPLIFIED_UUID_REGEX = /^[0-9a-f]{32}$/;
const GUILD_ID_REGEX = /^[a-f0-9]{24}$/;

const isOnline = (lastLogin, lastLogout) =>
	lastLogin > lastLogout ? 'Online' : 'Offline';

const networkLevel = networkExp => {
	const REVERSE_PQ_PREFIX = -3.5;
	const REVERSE_CONST = 12.25;
	const GROWTH_DIVIDES_2 = 0.0008;
	return networkExp < 0
		? 1
		: Math.floor(
			1 +
					REVERSE_PQ_PREFIX +
					Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * networkExp)
		);
};

const numberWithCommas = number =>
	number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const formatAPITime = timestamp =>
	moment(timestamp).format('dddd, MMMM, Do YYYY, h:mm:ss a');

const addSuffix = amount => {
	amount = '' + amount;
	const lastChar = amount.slice(-1);
	if (['0', '4', '5', '6', '7', '8', '9'].indexOf(lastChar) + 1) amount += 'th';
	if (lastChar === '1') amount += 'st';
	if (lastChar === '2') amount += 'nd';
	if (lastChar === '3') amount += 'rd';
	return amount;
};

const getRank = json => {
	let fullRank;
	let baseRank = 'Default';
	let permRank;
	let displayRank;
	if (json.packageRank) baseRank = replaceRank(json.packageRank);
	if (json.newPackageRank) baseRank = replaceRank(json.newPackageRank);
	if (json.monthlyPackageRank == 'SUPERSTAR') baseRank = 'MVP++';
	if (json.rank && json.rank != 'NORMAL') {
		permRank = json.rank.replace('MODERATOR', 'MOD');
	}
	if (json.prefix) displayRank = json.prefix.replace(/§.|\[|]/g, '');

	function replaceRank(toReplace) {
		return toReplace
			.replace('VIP_PLUS', 'VIP+')
			.replace('MVP_PLUS', 'MVP+')
			.replace('NONE', 'Default');
	}

	fullRank = `**[${baseRank}]**`;
	if (permRank) fullRank = `**[${permRank}]** *(actually ${baseRank})*`;
	if (displayRank) {
		fullRank = `**[${displayRank}]** *(${
			permRank ? `[${permRank}] ` : ''
		}actually ${baseRank})*`;
	}
	return fullRank;
};

const guildLevel = guildExp => {
	switch (guildExp) {
	case guildExp < 100000:
		return 0;
	case guildExp < 250000:
		return 1;
	case guildExp < 500000:
		return 2;
	case guildExp < 1000000:
		return 3;
	case guildExp < 1750000:
		return 4;
	case guildExp < 2750000:
		return 5;
	case guildExp < 4000000:
		return 6;
	case guildExp < 5500000:
		return 7;
	case guildExp < 7500000:
		return 8;
	case guildExp < 10000000:
		return 9;
	case guildExp < 23000000:
		return 9 + Math.floor((guildExp - 7500000) / 2500000);
	case guildExp >= 23000000:
		return 14 + Math.floor((guildExp - 20000000) / 3000000);
	}
};

const richEmbed = () =>
	new Discord.RichEmbed().setFooter(
		'Dispixel | Made with <3 by Thorin#0544',
		logoUrl
	);

const isValidNickname = string => NICKNAME_REGEX.test(string);

const isValidGuildId = string => GUILD_ID_REGEX.test(string);

const isValidUuid = string =>
	string.match(FULL_UUID_REGEX) || string.match(SIMPLIFIED_UUID_REGEX);

const insertString = (string, index, value) =>
	string.substr(0, index) + value + string.substr(index);

const formatTrimmedUuid = trimmedUuid => {
	trimmedUuid = insertString(trimmedUuid, 8, '-');
	trimmedUuid = insertString(trimmedUuid, 13, '-');
	trimmedUuid = insertString(trimmedUuid, 18, '-');
	trimmedUuid = insertString(trimmedUuid, 23, '-');
	return trimmedUuid;
};

const capitalize = string => string.charAt(0).toUpperCase() + string.substr(1);

module.exports = {
	isOnline,
	networkLevel,
	numberWithCommas,
	formatAPITime,
	guildLevel,
	getRank,
	addSuffix,
	richEmbed,
	isValidNickname,
	isValidGuildId,
	isValidUuid,
	formatTrimmedUuid,
	capitalize,
};
