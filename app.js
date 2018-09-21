const access = require('./key.json');
const commands = require('./libs/commands.js');
const config = require('./config.json');
const moment = require('moment');

//Discord setup
const Discord = require('discord.js'),
bot = new Discord.Client();
bot.login(access.discord_token);

//Hypixel API setup
const hypixel = require('hypixeljs');
hypixel.login(access.hypixel_api_keys);

bot.on('ready', () => console.log(`Dispixel is ready to rock and roll! Started at ${moment().format()}`));

//Listen for commands
commands.listen(bot);
