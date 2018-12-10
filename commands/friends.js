const { isValidNickname, isValidUuid } = require('../lib/dispixelutil');
const hypixeljs = require('hypixeljs');
const mojangjs = require('mojangjs');
const moment = require('moment');

const DATE_FORMAT = 'MM-DD-YYYY HH:mm:ss';
const FRIENDS_SORTER = (friendOne, friendTwo) => friendOne.since - friendTwo.since;

function buildFriendsMessage(playerName, playerUuid, friends) {
	let message = `**${playerName}'s friends** `;
	message += '```js\n' + 'Nickname'.padEnd(17) + '| Friends since\n\n';

	for (let index = 0; index < friends.length; index++) {
		const friend = friends[index];
		const string = `${friend.nickname.padEnd(17)}| ${moment(friend.since).format(DATE_FORMAT)}\n`;
		if ((message.length + string.length) >= 1997) {
			break;
		}
		message += string;
	}

	message += '```';

	return message;
}

module.exports = {
	name: 'friends',
	description: '',
	args: true,
	usage: '[username/UUID]',
	cooldown: 10,
	execute(message, args) {
		if (args.length !== 1) {
			return message.reply('You should provide a valid nickname or UUID.');
		}

		const input = args[0];

		if (!isValidNickname(input) && !isValidUuid(input)) {
			return message.reply(
				`the player name provided ${input} was not valid as it was more than sixteen characters and wasn't in a UUID format. We do support UUIDs!`
			);
		}

		let promise = undefined;

		if (isValidNickname(input)) {
			promise = mojangjs
				.getUUID(input)
				.then(uuid => Promise.all([input, uuid, hypixeljs.getFriends(uuid)]))
				.catch(console.error);
		} else {
			promise = Promise.all([
				mojangjs.getNameFromUUID(input),
				input,
				hypixeljs.getFriends(input),
			]);
		}

		promise
			.then(([playerName, playerUuid, hypixelApiResponse]) => {
				const friendsPromises = [];
				hypixelApiResponse
					.forEach(friendObj => {
						const friendUuid =
							friendObj.uuidSender === playerUuid
								? friendObj.uuidReceiver
								: friendObj.uuidSender;

						friendsPromises.push(
							mojangjs.getNameFromUUID(friendUuid).then(friendNickname => ({
								nickname: friendNickname,
								uuid: friendUuid,
								since: friendObj.started,
							}))
						);
					});

				Promise.all(friendsPromises).then(friends => {
					friends = friends.sort(FRIENDS_SORTER);
					message.channel.send(buildFriendsMessage(playerName, playerUuid, friends));
				});
			})
			.catch(console.error);
	},
};
