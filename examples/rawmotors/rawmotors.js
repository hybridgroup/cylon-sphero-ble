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
    my.ollie.color(0xFF0000);
    after((1).second(), function() {
      my.ollie.setRawMotors("forward", 200, "reverse", 200);
    });
    after((5).seconds(), function() {
      my.ollie.setRawMotors("reverse", 200, "forward", 200);
    });
    after((10).seconds(), function() {
      my.ollie.stop();
    });
    after((12).seconds(), function() {
      my.ollie.color(0x0000FF);
    });
  }
}).start();
