/*
 * cylon-ollie driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var Sphero = require('spheron');

var OllieBLEService = '22bb746f2bb075542d6f726568705327',
    WakeMainProcessor = '22bb746f2bbf75542d6f726568705327',
    TXPower = '22bb746f2bb275542d6f726568705327',
    OllieRobotControlService = '22bb746f2ba075542d6f726568705327',
    Roll = '22bb746f2ba175542d6f726568705327',
    Notify = '22bb746f2ba675542d6f726568705327';

var Driver = module.exports = function Driver(opts) {
  Driver.__super__.constructor.apply(this, arguments);

  this.commands = {
    wake: this.wake,
    set_tx_power: this.setTXPower,
    get_data: this.getData,
    setRGB: this.setRGB
  };
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

Driver.prototype.wake = function(callback) {
  this._writeServiceCharacteristic(OllieBLEService, 1, WakeMainProcessor, callback);
}

Driver.prototype.setTXPower = function(level) {
  this._writeServiceCharacteristic(OllieBLEService, level, TXPower, callback);
}

Driver.prototype.getData = function(callback) {
  var self = this;
  this.connection.notifyServiceCharacteristic(OllieRobotControlService, Notify, true,
    function(err, data) {
      // if (data !== null) {
      //   data = self._parseData(data);
      // }

      callback(err, data);
    }
  );
};

Driver.prototype.setRGB = function(color, persist, options) {
  var packet = Sphero.commands.api.setRGB(color, persist, {resetTimeout:true, requestAcknowledgement:true});
  console.log(packet);
  this._writeServiceCharacteristic(OllieRobotControlService, 
    packet, 
    Roll, 
    function() {
      console.log('writeServiceCharacteristic');
    }
  );
};

Driver.prototype.roll = function(speed, heading, state, options) {
  var packet = Sphero.commands.api.roll(speed, heading, state, {resetTimeout:true, requestAcknowledgement:true});
  console.log(packet);
  this._writeServiceCharacteristic(OllieRobotControlService, 
    packet, 
    Roll, 
    function() {
      console.log('writeServiceCharacteristic');
    }
  );
};

Driver.prototype._writeServiceCharacteristic = function(serviceId, value, characteristic, callback) {
  this.connection.writeServiceCharacteristic(serviceId, characteristic, new Buffer(value),
    function(err) {
      if ('function' === typeof(callback)) { callback(err); }
    }
  );
};
