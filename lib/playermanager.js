var EventEmitter = require('events');
var merge = require('merge');
var util = require('util');
var workerproxy = require('workerproxy');

module.exports = PlayerManager;

function PlayerManager(opt_options) {
  EventEmitter.call(this);

  var options = {
    workerPath: __dirname + '/worker.js'
  };

  Object.seal(options);
  merge(options, opt_options);
  Object.freeze(options);

  this.options = options;
  this.data = null;

  var worker = new Worker(options.workerPath);
  this.api = workerproxy(worker, {timeCalls: true});
}
util.inherits(PlayerManager, EventEmitter);

PlayerManager.prototype.open = function (file, callback) {
  this.api.open(file, (err, data) => {
    if (err) {
      console.error(err.stack);
      return;
    }

    this.data = data;
    this.emit('load', {data: data});
    callback(err, data);
  });
};
