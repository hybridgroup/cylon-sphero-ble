"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("bluetooth", {
    adaptor: "central",
    uuid: "cc360e85785e",
    module: "cylon-ble"
  })
  .device("ollie", { driver: "ollie" })
  .on("ready", function(bot) {

    bot.ollie.wake(function() {
      every((1).second(), function() {
        bot.ollie.setRGB(Math.floor(Math.random() * 100000));
      });
    });
  });

Cylon.start();
