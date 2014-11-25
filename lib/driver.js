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
    setRGB: this.setRGB,
    roll: this.roll,
    stop: this.stop,
    set_raw_motor_values: this.setRawMotorValues,
    set_stabilization: this.setStabilization
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
  this._writeServiceCharacteristic(OllieBLEService, WakeMainProcessor, 1, callback);
}

Driver.prototype.setTXPower = function(level) {
  this._writeServiceCharacteristic(OllieBLEService, TXPower, level, callback);
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

Driver.prototype.setRGB = function(color, persist, callback) {
  var packet = Sphero.commands.api.setRGB(color, persist, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService, 
    Roll, 
    packet, 
    function() {
      console.log('setRGB');
    }
  );
};

Driver.prototype.roll = function(speed, heading, state, callback) {
  var packet = Sphero.commands.api.roll(speed, heading, state, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService, 
    Roll, 
    packet, 
    function() {
      console.log('roll');
    }
  );
};

Driver.prototype.stop = function() {
  this.roll(0, 0, 1);
};

// From Sphero API docs:
//
// This allows you to take over one or both of the motor output values, instead of having the stabilization 
// system control them. Each motor (left and right) requires a mode (see below) and a power value from 0-
// 255. This command will disable stabilization if both modes aren't "ignore" so you'll need to re-enable it 
// via setStabilization() once you're done.
// MODE description
// 00h Off (motor is open circuit)
// 01h Forward
// 02h Reverse
// 03h Brake (motor is shorted)
// 04h Ignore (motor mode and power is left unchanged)
Driver.prototype.setRawMotorValues = function(leftMode, leftPower, rightMode, rightPower, callback) {
  var packet = Sphero.commands.api.setRawMotorValues(leftMode, leftPower, rightMode, rightPower, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService,
    Roll,
    packet,
    function() {
      console.log('setRawMotorValues');
    }
  );
};

Driver.prototype.setStabilization = function(enable, callback) {
  var packet = Sphero.commands.api.setStabilization(enable, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService,
    Roll,
    packet,
    function() {
      console.log('setStabilization');
    }
  );
};

Driver.prototype._writeServiceCharacteristic = function(serviceId, characteristicId, value, callback) {
  this.connection.writeServiceCharacteristic(serviceId, characteristicId, new Buffer(value),
    function(err, data) {
      if ('function' === typeof(callback)) { callback(err, data); }
    }
  );
};
