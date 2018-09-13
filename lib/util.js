const config = require('../config.json'),
commands = require('./commandInfo.json');

module.exports = {
  /*
  Discord-related methods
  */

  //Checks if the query is one of the command's numerous names. If it is, it then checks for proper argument lengths then runs the callback method
  isCommand: (query, args, commandName, callback) => {
    const commandData = commands[commandName];
    if (commandData.names.indexOf(query)+1) if (args.length >= commandData.argsMin && args.length <= commandData.argsMax) callback(null);
    else callback(`Invalid usage! Proper usage: \n\`\`\`${config.prefix}${commandData.names[0]} ${commandData.usage}\`\`\``);
  },

  //Returns a stats message in Discord's MessageEmbed format
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

  //Returns an error message in Discord's MessageEmbed format
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
  },


  /*
  Hypixel API methods
  */

  //Checks if user is online based on login/logout timestamps
  isOnline: (lastLogin, lastLogout) => {return lastLogin > lastLogout},

  //Fetches network level based on network exp
  //Huge thanks to @Thorin for creating this method! <3
  networkLevel: networkExp => {
    REVERSE_PQ_PREFIX = -3.5,
    REVERSE_CONST = 12.25,
    GROWTH_DIVIDES_2 = 0.0008;
    return networkExp < 0 ? 1 : Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * networkExp));
  },

  //Fetches guild level based on guild exp
  guildLevel: guildExp => {
    if (guildExp < 100000) return 0;
    else if (guildExp < 250000) return 1;
    else if (guildExp < 500000) return 2;
    else if (guildExp < 1000000) return 3;
    else if (guildExp < 1750000) return 4;
    else if (guildExp < 2750000) return 5;
    else if (guildExp < 4000000) return 6;
    else if (guildExp < 5500000) return 7;
    else if (guildExp < 7500000) return 8;
    else if (guildExp < 10000000) return 9;
    else if (guildExp < 23000000) {
      return 9 + Math.floor((guildExp-7500000)/2500000);
    }
    else if (guildExp >= 23000000) {
      return 14 + Math.floor((guildExp-20000000)/3000000);
    }
  },

  //Adds commas to a number using the regular expression found here: https://answers.acrobatusers.com/How-to-separate-thousands-with-space-and-adding-2-decimal-places-q282162.aspx
  numberWithCommas: number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
}
