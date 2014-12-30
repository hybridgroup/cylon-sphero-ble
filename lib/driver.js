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

// sends the special string to antidos service and tx to 7 and wake
// which seems to be what is required to place into dev mode
Driver.prototype.devModeOn = function (callback) {
    console.log("Putting into Dev Mode");
    var ollie = this;
    this.setAntiDos(function (err, data) {
        console.log("anti dos sent");
        console.log("setting tx power to 7");
        ollie.setTXPowerWithCallback(7, function (err, data) {
            console.log("tx power sent");
            console.log("sending wak");
            ollie.wake(function (err, data) {
                console.log("wake sent");
                callback(err, data);
            });
        });
    });
}

// send special anti dos string ollie :-)
Driver.prototype.setAntiDos = function (callback) {
    var str = "011i3";
    var bytes = [];

    for (var i = 0; i < str.length; ++i) 
        bytes.push(str.charCodeAt(i));

    this._writeServiceCharacteristic(OllieBLEService, AntiDos, bytes, callback);
}

// Set BLE transmit power. Uses more battery, but gives longer range.
Driver.prototype.setTXPowerWithCallback = function(level,callback) {
  this._writeServiceCharacteristic(OllieBLEService, TXPower, level, callback);
}

// Wake up and do things
Driver.prototype.wake = function(callback) {
  this._writeServiceCharacteristic(OllieBLEService, WakeMainProcessor, 1, callback);
}

// Set BLE transmit power. Uses more battery, but gives longer range.
Driver.prototype.setTXPower = function(level) {
  this._writeServiceCharacteristic(OllieBLEService, TXPower, level, callback);
}

// Set the RGB color of the built-in LED
Driver.prototype.setRGB = function(color, persist, callback) {
  var packet = Sphero.commands.api.setRGB(color, persist, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService, 
    Roll, 
    packet, 
    callback
  );
};

// Roll the Ollie in a paticular speed and direction
Driver.prototype.roll = function(speed, heading, state, callback) {
  var packet = Sphero.commands.api.roll(speed, heading, state, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService, 
    Roll, 
    packet, 
    callback
  );
};

// Stop rolling
Driver.prototype.stop = function(callback) {
  this.roll(0, 0, 1, callback);
};

// From Sphero API docs:
//
// This allows you to take over one or both of the motor output values, instead of having the stabilization 
// system control them. Each motor (left and right) requires a mode (see below) and a power value from 0-
// 255. This command will disable stabilization if both modes aren't "ignore" so you'll need to re-enable it 
// via setStabilization() once you're done.
// You can use the defined raw Motor* commands:
//  MotorOff
//  MotorForward
//  MotorReverse
//  MotorBrake (motor is shorted)
//  MotorIgnore (motor mode and power is left unchanged)
Driver.prototype.setRawMotorValues = function(leftMode, leftPower, rightMode, rightPower, callback) {
  var packet = Sphero.commands.api.setRawMotorValues(leftMode, leftPower, rightMode, rightPower, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService,
    Roll,
    packet,
    callback
  );
};

// Enables/disables the auto-stabilization. Often used after setting
// raw motor commands.
Driver.prototype.setStabilization = function(enable, callback) {
  var packet = Sphero.commands.api.setStabilization(enable, {resetTimeout:true});
  this._writeServiceCharacteristic(OllieRobotControlService,
    Roll,
    packet,
    callback
  );
};

Driver.prototype._writeServiceCharacteristic = function(serviceId, characteristicId, value, callback) {
  this.connection.writeServiceCharacteristic(serviceId, characteristicId, new Buffer(value),
    function(err, data) {
      if ('function' === typeof(callback)) { callback(err, data); }
    }
  );
};
