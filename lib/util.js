const config = require('../config.json'),
commands = require('./commandInfo.json');

module.exports = {
  isCommand: (query, args, commandName, callback) => {
    const commandData = commands[commandName];
    console.log(commandName)
    if (commandData.names.indexOf(query)+1) if (args.length >= commandData.argsMin && args.length <= commandData.argsMax) callback(null);
    else callback(`Invalid usage! Proper usage: \n\`\`\`${config.prefix}${commandData.names[0]} ${commandData.usage}\`\`\``);
  },
  statsEmbed: (title, description, fields, thumbnail) => {
    return {
      embed: {
        title: title,
        description: description,
        fields: fields,
        thumbnail: {
          url: thumbnail
        }
      }
    }
  },
  errorEmbed: message => {
    return {
      embed: {
        title: 'Error',
        description: message,
        thumbnail: {
          url: config.icons.warning
        }
      }
    }
  }
}
