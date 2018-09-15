const config = require('./config.json'),
commands = require('./libs/commands.js');

//Discord setup
const Discord = require('discord.js'),
client = new Discord.Client();
client.login(config.token);

client.on('ready' () => {
  console.log("Dispixel is ready to rock and roll!");
});

//Get everything running
commands.listen(client);
