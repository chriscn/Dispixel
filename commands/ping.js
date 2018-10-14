module.exports = {
	name: 'ping',
	description: 'Pong!',
	execute(message) {
		message.reply(`Pong! ${new Date().getTime() - message.createdTimestamp}ms`);
	},
};
