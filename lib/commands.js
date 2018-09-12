const config = require('../config.json'),
util = require('./util.js');

module.exports = {
  listen: client => client.on('message', message => {
    if (!(new RegExp(`^${config.prefix}[A-Za-z0-9]+(.*)$`).test(message.content))) return;

    const args = message.content.replace(config.prefix, '').trim().split(/ +/g),
    cmd = args.shift().toLowerCase();

    const channel = message.channel,
    content = message.cleanContent,
    author = message.author,
    member = message.member,
    guild = message.guild;

    util.isCommand(cmd, args, 'player', err => {
      if (err) return channel.send(util.errorEmbed(err)).catch(err => console.log(err));
      channel.send(util.statsEmbed(
        'Title',
        'Description',
        [
          {
            inline: true,
            name: 'Name',
            value: 'Value'
          },
          {
            inline: true,
            name: 'Name1',
            value: 'Value1'
          },
          {
            inline: true,
            name: 'Name2',
            value: 'Value2'
          },
          {
            inline: true,
            name: 'Name3',
            value: 'Value3'
          }
        ],
        'https://visage.surgeplay.com/head/1f403c4916694b7fbb5dac500a490f12'
      )).catch(err => console.log(err));
    });
  })
}
