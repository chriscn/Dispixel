const access = require(__dirname +'/key.json');
const commands = require(__dirname + '/libs/commands.js');
const config = require(__dirname + '/config.json');
const moment = require('moment');
const debug = false;

//Discord setup
const Discord = require('discord.js'),
bot = new Discord.Client();
bot.login(access.discord_token);

//Hypixel API setup
const hypixel = require('hypixeljs');
hypixel.login(access.hypixel_api_keys);

bot.on('ready', () => {
  bot.channels.get(config.logging_channel).send(`Dispixel is ready to rock and roll! Started at ${moment().format()}`);
});


bot.on('message', (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  const args = message.content.replace(config.prefix, '').split(/ +/g); // splits the message with each space
  const cmd = args.shift();
  const user = message.member.user.id;
  if (debug) {
    console.log(`[COMMAND REQUEST] by ${user} (${message.author.username}) requesting ${cmd} with arguments: ${args}`);
  } else {
    bot.channels.get(config.logging_channel).send(`[COMMAND REQUEST] by ${user} (${message.author.username}) requesting ${cmd} with arguments ${args}`);
  }
});

//Listen for commands
commands.listen(bot);

