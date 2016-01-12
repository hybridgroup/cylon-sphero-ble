"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    bluetooth: { adaptor: "central", uuid: "cc360e85785e", module: "cylon-ble" }
  },

  devices: {
    ollie: { driver: "ollie" }
  },

  work: function(my) {
    every((1).second(), function() {
      my.ollie.randomColor();
    });
  }
}).start();
