"use strict";

var SpheroBLE = require("./lib/driver");

module.exports = {
  drivers: ["ollie", "bb8"],

  driver: function(opts) {
    return new SpheroBLE(opts);
  }
};
