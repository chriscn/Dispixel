const keys = require('../../keys.json').hypixel_api_keys,
util = require('../util.js'),
request = require('request');

var currentKey = 0;

function key() {
  currentKey++;
  if (currentKey == 3) currentKey = 0;
  return keys[currentKey];
}

function apiRequest(path, params, value, callback) {return new Promise((resolve, reject) => {
  request(`https://api.hypixel.net/${path}?key=${key()}&${params}`, (err, resp, body) => {
    if (!err) try {
      var json = JSON.parse(body);
    } catch (err) {
      return callback('Recieved an invalid response! Try again later.', null);
    }
    if (json) {
      if (json.success) {
        var json = value ? json[value] : json;
        if (!json) return callback(`That ${path} could not be found!`, null);

        //Append pre-calculated stats to response
        if (path == 'guild') json.level = util.guildLevel(json.exp);
        if (path == 'player') {
          json.level = util.networkLevel(json.networkExp);
          json.online = util.isOnline(json.lastLogin, json.lastLogout);

          //Fetch purchased (and staff rank/custom prefix if applicable)
          json.baseRank = 'Default';
          if (json.packageRank) json.baseRank = json.packageRank.replace('VIP_PLUS', 'VIP+').replace('MVP_PLUS', 'MVP+').replace('NONE', 'Default');
          if (json.newPackageRank) json.baseRank = json.newPackageRank.replace('VIP_PLUS', 'VIP+').replace('MVP_PLUS', 'MVP+').replace('NONE', 'Default');
          if (json.monthlyPackageRank == 'SUPERSTAR') json.baseRank = 'MVP++';
          if (json.rank) if (json.rank != 'NORMAL') json.displayRank = json.rank.replace('MODERATOR', 'MOD');
          if (json.prefix) json.displayRank = json.prefix.replace(/§.|\[|]/g, '');
        }
        return callback(null, json);
      }
      return callback(`API Error! \`${json.cause}\``, null);
    }
    return callback('An unknown error occured! Try again later.', null);
  });
})};

module.exports = {
  currentKey: () => {return currentKey},

  getGuildById: (id, callback) => apiRequest('guild', `id=${id}`, 'guild', callback),

  getGuildByName: (name, callback) => apiRequest('guild', `name=${name}`, 'guild', callback),

  getPlayerByUUID: (uuid, callback) => apiRequest('player', `uuid=${uuid}`, 'player', callback),

  getPlayerByName: (name, callback) => apiRequest('player', `name=${name}`, 'player', callback)
}
