"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    bluetooth: { adaptor: "central", uuid: "cc360e85785e", module: "cylon-ble"}
  },

  devices: {
    ollie: { driver: "ollie"}
  },

  work: function(my) {
    my.ollie.color(0x00FFFF);

    after(500, function() {
      my.ollie.color(0xFF0000);
    });

    after(1000, function() {
      my.ollie.roll(60, 0, 1);
    });

    after(2000, function() {
      my.ollie.roll(60, 180, 1);
    });

    after(3000, function() {
      my.ollie.stop();
    });
  }
}).start();
