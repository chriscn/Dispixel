const keys = require('./keys.json'),
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
      return callback(new Error('Invalid json'), null);
    }
    if (json) {
      if (json.success) {
        var json = value ? json[value] : json;
        if (!json) return callback(new Error('Found nothing'), null);
        if (path == 'guild') json.level = util.guildLevel(json.exp);
        if (path == 'player') {
          json.level = util.networkLevel(json.networkExp);
          json.online = util.isOnline(json.lastLogin, json.lastLogout);
        }
        return callback(null, json);
      }
      return callback(new Error(json.cause), null);
    }
    return callback(new Error('Unknown error'), null);
  });
})};

module.exports = {
  currentKey: () => {return currentKey},

  getGuildById: (id, callback) => apiRequest('guild', `id=${id}`, 'guild', callback),

  getGuildByName: (name, callback) => apiRequest('guild', `name=${name}`, 'guild', callback),

  getPlayerByUUID: (uuid, callback) => apiRequest('player', `uuid=${uuid}`, 'player', callback),

  getPlayerByName: (name, callback) => apiRequest('player', `name=${name}`, 'player', callback)
}
