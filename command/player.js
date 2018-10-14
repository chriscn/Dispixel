module.exports = {
	name: 'player',
	description: 'Get detailed information about a player using the Hypixel API',
	args: true,
	cooldown: 10,
	execute(message, args) {
		if (args[0].length > 16) {
			message.reply(`the player name provided ${args[0]} was not valid as it was more than sixteen characters.`);
		}
	},
};
