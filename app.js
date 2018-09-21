const token = require('./key.json').discord_token;
const commands = require('./libs/commands.js');
const config = require('./config.json');
const moment = require('moment');

// Discord setup
const Discord = require('discord.js'),
bot = new Discord.Client();
bot.login(token);

bot.on('ready', () => console.log(`Dispixel is ready to rock and roll! Started at ${moment().format()}`));

//Listen for commands
commands.listen(bot);
