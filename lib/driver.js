/*
 * cylon-ollie driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');
var Sphero = require('hybridgroup-spheron');

var OllieBLEService = '22bb746f2bb075542d6f726568705327',
    WakeMainProcessor = '22bb746f2bbf75542d6f726568705327',
    TXPower = '22bb746f2bb275542d6f726568705327',
    AntiDos = '22bb746f2bbd75542d6f726568705327',
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

  // Raw Motor Commands for use with setRawMotorValues
  // Off (motor is open circuit)
  this.MotorOff = 0x00;

  // Forward
  this.MotorForward = 0x01;

  // Reverse
  this.MotorReverse = 0x02;

  // Brake (motor is shorted)
  this.MotorBrake = 0x03;

  // Ignore (motor mode and power is left unchanged)
  this.MotorIgnore = 0x04;
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  callback();
};

Driver.prototype.halt = function(callback) {
  callback();
};

/**
 * Tells the Ollie to wake up
 *
 * @param {Function} callback function to be triggered when the Ollie is awake
 * @return {null}
 * @publish
 */
Driver.prototype.wake = function(callback) {
  this._writeServiceCharacteristic(OllieBLEService, WakeMainProcessor, 1, callback);
}

/**
 * Sets the BLE transmit power for the Ollie.
 *
 * Uses more battery, but gives longer range
 *
 * @param {Number} level
 * @param {Function} callback
 * @return {null}
 * @publish
 */
Driver.prototype.setTXPower = function(level, callback) {
  this._writeServiceCharacteristic(OllieBLEService, TXPower, level, callback);
}

/**
 * Sets the RGB color of Ollie's built-in LED
 *
 * @param {Number} color
 * @param {Boolean} persist
 * @param {Function} callback
 * @return {null}
 * @publish
 */
Driver.prototype.setRGB = function(color, persist, callback) {
  var packet = Sphero.commands.api.setRGB(color, persist, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService,
    Roll,
    packet,
    callback
  );
};

/**
 * Tells Ollie to roll in a particular speed and heading
 *
 * @param {Number} speed
 * @param {Number} heading
 * @param {Number} state
 * @param {Function} callback
 * @return {null}
 * @publish
 */
Driver.prototype.roll = function(speed, heading, state, callback) {
  var packet = Sphero.commands.api.roll(speed, heading, state, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService,
    Roll,
    packet,
    callback
  );
};

//
/**
 * Tells Ollie to stop rolling
 *
 * @param {Function} callback
 * @return {null}
 * @publish
 */
Driver.prototype.stop = function(callback) {
  this.roll(0, 0, 1, callback);
};

/**
 * Allows for direct control of both motors, rather than auto-control via the
 * stabilization system.
 *
 * Each motor (left and right) requires a mode (see below) and a power value
 * from 0-255. This command will disable stabilization if both modes aren't
 * "ignore" so you'll need to re-enable it via setStabilization() once you're
 * done.
 *
 * @param {Number} leftMode
 * @param {Number} leftPower
 * @param {Number} rightMode
 * @param {Number} rightPower
 * @param {Function} callback
 * @return {null}
 * @publish
 */
Driver.prototype.setRawMotorValues = function(leftMode, leftPower, rightMode, rightPower, callback) {
  var packet = Sphero.commands.api.setRawMotorValues(leftMode, leftPower, rightMode, rightPower, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService,
    Roll,
    packet,
    callback
  );
};

/**
 * Used to enable/disable Ollie's auto-stabilization
 *
 * Often used after setting raw motor commands.
 *
 * @param {Number} enable
 * @param {Function} callback
 * @return {null}
 * @publish
 */
Driver.prototype.setStabilization = function(enable, callback) {
  var packet = Sphero.commands.api.setStabilization(enable, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService,
    Roll,
    packet,
    callback
  );
};

/**
 * Enables developer mode on the Ollie.
 *
 * This is accomplished via sending a special string to the Anti-DoS service,
 * setting TX power to 7, and telling the Sphero to wake up.
 *
 * @param {Function} callback
 * @return {null}
 * @publish
 */
Driver.prototype.devModeOn = function (callback) {
  var ollie = this;

  Logger.info("Putting Ollie into dev mode.");
  Logger.debug("Sending anti-DoS string.");

  ollie.setAntiDos(function (err, data) {
    Logger.debug("Anti-DoS sent.");
    Logger.debug("Setting TX power to 7.");

    ollie.setTXPower(7, function (err, data) {
      Logger.debug("TX power sent.");
      Logger.debug("Sending wake.");

      ollie.wake(function (err, data) {
        Logger.debug("Wake sent.");

        callback(err, data);
      });
    });
  });
};

/**
 * Sends a special Anti-DoS string to the Ollie.
 *
 * Used when enabling developer mode
 *
 * @param {Function} callback
 * @return {null}
 */
Driver.prototype.setAntiDos = function (callback) {
  var str = "011i3";
  var bytes = [];

  for (var i = 0; i < str.length; ++i)  {
    bytes.push(str.charCodeAt(i));
  }

  this._writeServiceCharacteristic(OllieBLEService, AntiDos, bytes, callback);
}

Driver.prototype._writeServiceCharacteristic = function(serviceId, characteristicId, value, callback) {
  this.connection.writeServiceCharacteristic(serviceId, characteristicId, new Buffer(value),
    function(err, data) {
      if ('function' === typeof(callback)) { callback(err, data); }
    }
  );
};
