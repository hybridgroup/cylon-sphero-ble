/*
 * cylon-ollie
 * http://cylonjs.com
 *
 * Copyright (c) 2014 Your Name Here
 * Your License Here
*/

"use strict";

var Ollie = require("./driver");

module.exports = {
  drivers: ["ollie"],

  driver: function(opts) {
    return new Ollie(opts);
  }
};
