const util = require('../util.js'),
jimp = require('jimp');

var titleFont;
jimp.loadFont(util.fontPath('title'), (err, fontImg) => {
  if (err) return console.log(err);
  titleFont = fontImg;
});

var valueFont;
jimp.loadFont(util.fontPath('value'), (err, fontImg) => {
  if (err) return console.log(err);
  valueFont = fontImg;
});

var karmaFont;
jimp.loadFont(util.fontPath('karma'), (err, fontImg) => {
  if (err) return console.log(err);
  karmaFont = fontImg;
});

module.exports = {
  playerCard: (player, callback) => {
    jimp.read(util.resourcePath('bg/default'), (err, image) => {
      if (err) return callback(err, null);

      jimp.read(`https://visage.surgeplay.com/head/256/${player.uuid}`, (err, head) => {
        var saveName = Date.now();
        image
        .composite(head, 670, -20)
        .print(titleFont, 10, 10, `${player.displayname}'s General Stats`)
        .print(valueFont, 10, 75, 'Karma:')
        .print(karmaFont, 165, 75, util.numberWithCommas(player.karma))
        .write(`${__dirname}/out/${saveName}.png`);
        setTimeout(() => {
          return callback(null, `${__dirname}/out/${saveName}.png`);
        }, 500);
      });
    });
  }
}
