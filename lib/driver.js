/*
 * cylon-ollie driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var OllieBLEService = '22bb746f2bb075542D6f726568705327',
    WakeMainProcessor = '22bb746f2bbf75542d6f726568705327',
    TXPower = '22bb746f2bb275542d6f726568705327';

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);

  var extraParams = opts.extraParams || {};
  //this.serviceId = extraParams.serviceId;

  this.commands = {
    wake: this.wake,
    set_tx_power: this.setTXPower
  };
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

Driver.prototype.wake = function() {
  this._writeServiceCharacteristic(OllieBLEService, 1, WakeMainProcessor, callback);
}

Driver.prototype.setTXPower = function(level) {
  this._writeServiceCharacteristic(OllieBLEService, level, TXPower, callback);
}

Driver.prototype._writeServiceCharacteristic = function(serviceId, value, characteristic, callback) {
  this.connection.writeServiceCharacteristic(serviceId, characteristic, new Buffer([value]),
    function(err) {
      if ('function' === typeof(callback)) { callback(err); }
    }
  );
}
