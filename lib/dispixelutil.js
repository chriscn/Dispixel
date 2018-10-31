const moment = require('moment');

module.exports = {
	isOnline: (lastLogin, lastLogout) => {
		return (lastLogin > lastLogout) ? 'Online' : 'Offline';
	},

	networkLevel: networkExp => {
		const REVERSE_PQ_PREFIX = -3.5;
		const REVERSE_CONST = 12.25;
		const GROWTH_DIVIDES_2 = 0.0008;
		return networkExp < 0 ? 1 : Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * networkExp));
	},

	numberWithCommas: number => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	},

	formatAPITime: timestamp => {
		return moment(timestamp).format('dddd, MMMM, Do YYYY, h:mm:ss a');
	},

	guildLevel: number => {
		if (number < 100000) {
			return 0;
		} else if (number < 250000) {
			return 1;
		} else if (number < 500000) {
			return 2;
		} else if (number < 1000000) {
			return 3;
		} else if (number < 1750000) {
			return 4;
		} else if (number < 2750000) {
			return 5;
		} else if (number < 4000000) {
			return 6;
		} else if (number < 5500000) {
			return 7;
		} else if (number < 7500000) {
			return 8;
		} else if (number < 10000000) {
			return 9;
		} else if (number < 23000000) {
			return 9 + Math.floor((number - 7500000) / 2500000);
		} else if (number >= 23000000) {
			return 14 + Math.floor((number - 20000000) / 3000000);
		}
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

		function replaceRank(toReplace) {
			return toReplace.replace('VIP_PLUS', 'VIP+').replace('MVP_PLUS', 'MVP+').replace('NONE', 'Default');
		}

		fullRank = `**[${baseRank}]**`;
		if (permRank) fullRank = `**[${permRank}]** *(actually ${baseRank})*`;
		if (displayRank) fullRank = `**[${displayRank}]** *(${permRank ? `[${permRank}] ` : ''}actually ${baseRank})*`;
		return fullRank;
	},

	addSuffix: amount => {
		amount = '' + amount;
		const lastChar = amount.slice(-1);
		if (['0', '4', '5', '6', '7', '8', '9'].indexOf(lastChar) + 1) amount += 'th';
		if (lastChar === '1') amount += 'st';
		if (lastChar === '2') amount += 'nd';
		if (lastChar === '3') amount += 'rd';
		return amount;
	},
};
