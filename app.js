const config = require('./config.json'),
commands = require('./libs/commands.js');

//Discord setup
const Discord = require('discord.js'),
bot = new Discord.bot();
bot.login(config.discord_token);

bot.on('ready' () => {
  console.log("Dispixel is ready to rock and roll!");
});

//Get everything running
commands.listen(bot);
