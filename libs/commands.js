const config = require('../config.json');
const hypixel = require('hypixeljs');
const util = require('./util.js');
const Discord = require('discord.js');

function listen(bot) {
  bot.on('message', (message) => {
    if (!(new RegExp(`^${config.prefix}[A-Za-z0-9]+(.*)$`).test(message.content))) return;

    const args = message.content.replace(config.prefix, '').trim().split(/ +/g),
    cmd = args.shift().toLowerCase();

    const channel = message.channel,
    content = message.cleanContent,
    author = message.author,
    member = message.member,
    guild = message.guild;
    function error(err) {
      channel.send(util.errorEmbed(err)).catch((err) => console.log(err));
    }
    console.log(`[COMMAND] \'-${cmd} ${args.join(' ')}\' was recieved from \'${author.username}\' in channel \'${channel.id}\'`);

    //Commands, what fun

    //Pings the bot
    util.isCommand(cmd, args, 'ping', (err) => {
      channel.send(`Pong, ${Math.floor(bot.ping)}ms!`);
    });

    //Fetches a player's stats
    util.isCommand(cmd, args, 'player', (err) => {
      if (err) return error(err);
      if (args[0].length > 16) return hypixel.getPlayer.byUuid(args[0], (err, player) => {
        if (err) return error(err);
        sendPlayerEmbed(player);
      });
      hypixel.getPlayer.byName(args[0], (err, player) => {
        if (err) return error(err);
        sendPlayerEmbed(player);
      });
      function sendPlayerEmbed(player) {
        const playerEmbed = new Discord.RichEmbed()
        .setTitle(player.displayname + '\'s Statistics')
        .setThumbnail('https://visage.surgeplay.com/face/' + player.uuid)
        .addField('Rank:', `${player.displayRank ? `**[${player.displayRank}]** *(Actually ${player.baseRank})*` : `**[${player.baseRank}]**`}`, true)
        .addField('Level:', player.level, true)
        .addField('Karma:', player.karma ? util.numberWithCommas(player.karma) : 0)
        .addField('Achievement Points:', player.achievementPoints ? util.numberWithCommas(player.achievementPoints) : 0)
        .addField('Joined: ', (! player.firstJoined ? util.formatAPITime(player.firstJoined) : `Hasn't Joined`));
        message.channel.send(playerEmbed);
      }
    });
  })
}

module.exports = {listen: bot => listen(bot)};
