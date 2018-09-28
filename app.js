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

bot.on('message', (message) => {
  const args = message.content.replace(config.prefix, '').trim().split(/ +/g);
  const cmd = args.shift();
  /*message.channel.get(config.logging_channel).send*/console.log(`[COMMAND REQUEST] by ${message.username} requesting ${cmd} with arguments ${args}`);
});

/*bot.on('message', (message) => {
  const args = message.content.replace(config.prefix, '').trim().split(/ +/g);
  const cmd = args.shift().toLowerCase()
  message.channel.get(config.logging_channel).send(`[COMMAND REQUEST] \'-${cmd} ${args.join(' ')}\' was recieved from ${message.author}`)
});*/

//Listen for commands
commands.listen(bot);
