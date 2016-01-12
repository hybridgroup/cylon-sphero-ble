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
    battery: { driver: "ble-battery-service" },
    deviceInfo: { driver: "ble-device-information" },
    generic: { driver: "ble-generic-access" },
    ollie: { driver: "ollie", module: "cylon-sphero-ble" }
  },

  display: function(err, data) {
    if (err) {
      console.log("Error:", err);
      return;
    }

    console.log("Data:", data);
  },

  work: function(my) {
    my.generic.getDeviceName(function(err, data) {
      my.display(err, data);

      my.generic.getAppearance(function(err, data) {
        my.display(err, data);

        my.deviceInfo.getManufacturerName(function(err, data) {
          my.display(err, data);

          after(200, function() {
            console.log("color");
            my.ollie.color(0x00FFFF);
          });
        });
      });
    });
  }
}).start();
