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
    bb8: { driver: "bb8", module: "cylon-sphero-ble" }
  },

  work: function(my) {
    my.bb8.color(0x00FFFF);

    after(500, function() {
      my.bb8.color(0xFF0000);
    });

    after(1000, function() {
      my.bb8.roll(60, 0);
    });

    after(2000, function() {
      my.bb8.roll(60, 180);
    });

    after(3000, function() {
      my.bb8.stop();
    });
  }
}).start();
