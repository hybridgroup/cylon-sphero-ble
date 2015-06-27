"use strict";

var Ollie = require("./lib/driver");

module.exports = {
  drivers: ["ollie"],

  driver: function(opts) {
    return new Ollie(opts);
  }
};
