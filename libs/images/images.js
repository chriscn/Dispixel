const util = require('../util.js'),
jimp = require('jimp');

var titleFont;
jimp.loadFont(util.fontPath('title'), (err, fontImg) => {
  if (err) return console.log(err);
  titleFont = fontImg;
});

module.exports = {
  playerCard: (player, callback) => {
    jimp.read(util.resourcePath('bg/default'), (err, image) => {
      if (err) return callback(err, null);

      jimp.read(`https://visage.surgeplay.com/head/256/${player.uuid}`, (err, head) => {
        var saveName = Date.now();
        console.log(`${player.displayname}'s General Stats`)
        image
        .composite(head, 670, -20)
        .print(titleFont, 10, 10, `${player.displayname}'s General Stats`)
        .write(`${__dirname}/out/${saveName}.png`);
        setTimeout(() => {
          return callback(null, `${__dirname}/out/${saveName}.png`);
        }, 500);
      });
    });
  }
}
