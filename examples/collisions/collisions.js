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
    my.ollie.on("collision", function(data) {
      console.log(data);
    });
    my.ollie.detectCollisions();
  }
}).start();
