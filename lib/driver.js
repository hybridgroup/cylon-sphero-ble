/*
 * cylon-ollie driver
 * http://cylonjs.com
 *
 * Copyright (c) 2014-2015 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

/* eslint camelcase: 0, no-unused-vars: 0  */

var Cylon = require("cylon");
var sphero = require("sphero");

var Logger = Cylon.Logger;

var Driver = module.exports = function Driver() {
  Driver.__super__.constructor.apply(this, arguments);

  this.sphero = null;

  this.commands = {
    color: this.color,
    random_color: this.randomColor,
    get_color: this.getColor,
    detect_collisions: this.detectCollisions,
    start_calibration: this.startCalibration,
    finish_calibration: this.finishCalibration,
    stream_odometer: this.streamOdometer,
    stream_velocity: this.streamVelocity,
    stream_accel_one: this.streamAccelOne,
    stream_imu_angles: this.streamImuAngles,
    stream_accelerometer: this.streamAccelerometer,
    stream_gyroscope: this.streamGyroscope,
    stream_motors_back_emf: this.streamMotorsBackEmf,
    stop_on_disconnect: this.stopOnDisconnect,
    stop: this.stop,
    set_heading: this.setHeading,
    spin: this.spin
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

  this.heading = 0;
};

Cylon.Utils.subclass(Driver, Cylon.Driver);

Driver.prototype.start = function(callback) {
  this.sphero = sphero(this.connection.uuid, {peripheral: this.connection.connectedPeripheral()});
  this.sphero.connect(callback);
};

Driver.prototype.halt = function(callback) {
  callback();
};

/**
 * Roll the Ollie
 *
 * @param {Number} speed what speed Ollie should roll at
 * @param {Number} heading what heading Ollie should roll towards (0-359)
 * @param {Number} [state] optional state parameter
 * @param {Function} callback function to be triggered after writing
 * @return {void}
 * @publish
 */
Driver.prototype.roll = function(speed, heading, state, callback) {
  this.sphero.roll(speed, heading, state, callback);
};

/**
 * Sets the RGB color of built-in LED
 *
 * @param {Number} color color value to set
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.color = function(color, callback) {
  this.sphero.color(color, callback);
};

/**
 * Sets the RGB color built-in LED to random color
 *
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.randomColor = function(callback) {
  this.sphero.randomColor(callback);
};

/**
 * Gets the RGB color for built-in LED
 *
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.getColor = function(callback) {
  this.sphero.getColor(callback);
};


/**
 * Turns on collision detection mode
 *
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.detectCollisions = function(callback) {
  this.sphero.detectCollisions(callback);
};

/**
 * Turns on start calibration mode
 *
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.startCalibration = function(callback) {
  this.sphero.startCalibration(callback);
};

/**
 * Finish calibration mode
 *
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.finishCalibration = function(callback) {
  this.sphero.finishCalibration(callback);
};

/**
 * Stream odometer data
 *
 * @param {Number} [sps=5] samples per second
 * @param {Boolean} [remove=false] forces velocity streaming to stop
 * @return {void}
 * @publish
 */
Driver.prototype.streamOdometer = function(sps, remove) {
  this.sphero.streamOdometer(sps, remove);
};

/**
 * Stream velocity data
 *
 * @param {Number} [sps=5] samples per second
 * @param {Boolean} [remove=false] forces velocity streaming to stop
 * @return {void}
 * @publish
 */
Driver.prototype.streamVelocity = function(sps, remove) {
  this.sphero.streamVelocity(sps, remove);
};

/**
 * Stream accelOne data
 *
 * @param {Number} [sps=5] samples per second
 * @param {Boolean} [remove=false] forces velocity streaming to stop
 * @return {void}
 * @publish
 */
Driver.prototype.streamAccelOne = function(sps, remove) {
  this.sphero.streamAccelOne(sps, remove);
};

/**
 * Stream ImuAngles data
 *
 * @param {Number} [sps=5] samples per second
 * @param {Boolean} [remove=false] forces velocity streaming to stop
 * @return {void}
 * @publish
 */
Driver.prototype.streamImuAngles = function(sps, remove) {
  this.sphero.streamImuAngles(sps, remove);
};

/**
 * Stream accelerometer data
 *
 * @param {Number} [sps=5] samples per second
 * @param {Boolean} [remove=false] forces velocity streaming to stop
 * @return {void}
 * @publish
 */
Driver.prototype.streamAccelerometer = function(sps, remove) {
  this.sphero.streamAccelerometer(sps, remove);
};

/**
 * Stream gyroscope data
 *
 * @param {Number} [sps=5] samples per second
 * @param {Boolean} [remove=false] forces velocity streaming to stop
 * @return {void}
 * @publish
 */
Driver.prototype.streamGyroscope = function(sps, remove) {
  this.sphero.streamGyroscope(sps, remove);
};

/**
 * Stream motors back EMF data
 *
 * @param {Number} [sps=5] samples per second
 * @param {Boolean} [remove=false] forces velocity streaming to stop
 * @return {void}
 * @publish
 */
Driver.prototype.streamMotorsBackEmf = function(sps, remove) {
  this.sphero.streamMotorsBackEmf(sps, remove);
};

/**
 * Auto stop the Sphero when it detects it has become disconnected
 *
 * @param {Boolean} [remove=false] forces velocity streaming to stop
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.stopOnDisconnect = function(remove, callback) {
  this.sphero.stopOnDisconnect(remove, callback);
};

/**
 * Tell Sphero to adjust orientation
 *
 * @param {Number} heading heading to set as new zero
 * @param {Function} callback function to call when done
 * @return {void}
 * @publish
 */
Driver.prototype.setHeading = function(heading, callback) {
  this.sphero.setHeading(heading, callback);
};

/**
 * Tells Ollie to spin in place
 *
 * @param {String} direction direction to spin, either "left", or "right"
 * @param {Number} speed speed to spin
 * @return {void}
 * @publish
 */
Driver.prototype.spin = function(direction, speed) {
  if (direction === "right") {
    this.setRawMotorValues(
      this.MotorForward, speed,
      this.MotorReverse, speed
    );
  } else {
    this.setRawMotorValues(
      this.MotorReverse, speed,
      this.MotorForward, speed
    );
  }
};
