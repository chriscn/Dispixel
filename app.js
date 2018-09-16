const token = require('./key.json').discord_token;
const commands = require('./libs/commands.js');
const config = require('./config.json');
const prefix = config.prefix;
const moment = require('moment');

//Discord setup
const Discord = require('discord.js'),
bot = new Discord.Client();
bot.login(token);

bot.on('ready', () => {
  console.log(`Dispixel is ready to rock and roll! Started at ${moment().format()}`);
});

bot.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return; // does nothing if the message doesn't start with the prefix or user is a bot

  const args = message.content.slice(prefix.length).split(/ +/),
      command = args.shift().toLowerCase(),
      sender = message.author;

      if (command === 'ping') {
        message.channel.send(`Pong! ${bot.ping}ms`);
      }
});

// Logging
bot.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return; // does nothing if the message doesn't start with the prefix or user is a bot

  const args = message.content.slice(config.prefix.length).split(/ +/),
  command = args.shift().toLowerCase(),
  sender = message.author.username;

  console.log(`[COMMAND] <${command}> ${!args.length ? '':` with arguments: ${args.join(', ')}; `}from ${sender}`);
});


//Get everything running
commands.listen(bot);
