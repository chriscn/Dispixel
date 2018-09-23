const config = require('../config.json');
const keys = require('../key.json').hypixel_api_keys;
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
        .setTitle(`${player.displayname} **(Currently ${util.isOnline(player.lastLogin, player.lastLogout)})**`)
        .setThumbnail('https://visage.surgeplay.com/face/' + player.uuid)
        .addField('Rank:', util.getRank(player), true)
        .addField('Level:', util.networkLevel(player.networkExp), true)
        .addField('Karma:', player.karma ? util.numberWithCommas(player.karma) : 0, true)
        .addField('Achievement Points:', player.achievementPoints ? util.numberWithCommas(player.achievementPoints) : 0, true)
        .addField('Joined:', ! player.firstJoined ? util.formatAPITime(player.firstJoined) : `Hasn't Joined`, true);
        channel.send(guildEmbed);
      }
    });

    //Fetches a user's ban
    util.isCommand(cmd, args, 'ban', (err) => {
      if (channel.type != 'dm') return error('To keep users safe, this command is only available in one-on-one DMs.');
      if (err) return error(err);
      const player = args[0],
      banId = args[1];
      channel.send(util.statsEmbed('Please wait!', 'We are currently fetching other peoples\' bans. This could take a minute...', [], '')).then(banMessage => {
        setTimeout(() => sendBanEmbed(banMessage), 1500);
      });
      function sendBanEmbed(banMessage) {
        util.fetchBan(player, banId, (err, ban) => {
          if (err) return banMessage.edit(util.errorEmbed(err));
          const banEmbed = new Discord.RichEmbed()
          .setTitle(`Ban Information`)
          .setThumbnail('https://hypixel.net/styles/hypixel-uix/hypixel/watchdog.png')
          .addField('Player UUID:', ban.uuid)
          .addField('Ban ID:', `**${ban.id.toUpperCase().slice(-8)}** *(${ban.id})*`)
          .addField('Reason:', `${ban.reason}${ban.subType ? ` (${ban.subType})` : ''}`)
          .addField('Type:', ban.type == 0 ? 'Permenant' : 'Temporary', true);
          if (ban.tags.length > 0) banEmbed.addField('Tags:', `[${ban.tags.join('], [')}]`)
          banEmbed.addField('Since:', util.punishmentDate(ban.date), true)
          if (ban.type == 1) banEmbed.addField('Expires In:', util.punishmentExpiration(ban.duration))
          banMessage.edit(banEmbed);
        });
      }
    });

    //Fetches a guild's stats
    util.isCommand(cmd, [args.join(' ')], 'guild', (err) => {
      if (err) return error(err);
      hypixel.getGuild.byName(args.join(' '), (err, guild) => {
        if (err) return error(err);
        guild.members.forEach(member => {
          if (['GUILDMASTER', 'Guild Master'].indexOf(member.rank)+1) hypixel.getPlayer.byUuid(member.uuid, (err, player) => {
            if (err) return error(err);
            guild.master = player.displayname;
            sendGuildEmbed(guild);
          });
        });
      });
      function sendGuildEmbed(guild) {
        const guildEmbed = new Discord.RichEmbed()
        .setTitle(`${guild.tag ? `[${guild.tag}] `: ''}${guild.name}`)
        .setURL(`https://hypixel.net/guilds/${guild._id}`)
        .setThumbnail(guild.banner ? `https://hypixel.net/data/guild_banners/100x200/${guild._id}.png` : 'https://hypixel.net/styles/hypixel-uix/hypixel/default-guild-banner.png')
        .addField('Guild Master:', guild.master, true)
        .addField('Members:', guild.members.length, true)
        .addField('Level:', util.guildLevel(guild.exp), true)
        .addField('Experience:', util.numberWithCommas(guild.exp), true)
        .addField('Legacy Rank:', guild.legacyRanking != undefined ? util.addSuffix(util.numberWithCommas(guild.legacyRanking)) : 'Unknown')
        .addField('Created At:', util.formatAPITime(guild.created));
        message.channel.send(guildEmbed);
      }
    });

    //OP Commands
    if (['302930603932778506', '140843771075100672'].indexOf(author.id)+1) { // Dance's and Thorin's IDs I think
      if (cmd == 'requests') channel.send(`${hypixel.recentRequests()} requests made in the last minute. ${(keys.length*120)-hypixel.recentRequests()} remaining!`);
    }
  });
}

module.exports = {listen: bot => listen(bot)};
