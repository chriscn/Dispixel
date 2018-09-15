const config = require('./config.json'),
commands = require('./libs/commands.js');

//Discord setup
const Discord = require('discord.js'),
client = new Discord.Client();
client.login(config.token);

//Get everything running
commands.listen(client);
