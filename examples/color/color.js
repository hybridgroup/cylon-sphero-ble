"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    bluetooth: {
      adaptor: "central",
      uuid: process.env.ADDRESS,
      module: "cylon-ble"
    }
  },

  devices: {
    ollie: { driver: "ollie", module: "cylon-sphero-ble" }
  },

  work: function(my) {
    every((1).second(), function() {
      my.ollie.randomColor();
    });
  }
}).start();
