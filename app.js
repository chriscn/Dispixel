const token = require('./key.json').discord_token;
const commands = require('./libs/commands.js');

//Discord setup
const Discord = require('discord.js'),
bot = new Discord.Client();
bot.login(token);

bot.on('ready', () => {
  console.log("Dispixel is ready to rock and roll!");
});

//Get everything running
commands.listen(bot);
