var Document = require('starbound-files').Document;
var workerproxy = require('workerproxy');

var player;

workerproxy({
  open: function (file, callback) {
    // TODO: Allow loading multiple players.
    if (player) {
      throw new Error('A player has already been opened.');
    }

    player = Document.open(file);

    callback(null, player.data);
  }
}, {catchErrors: true});
