"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("bluetooth", {
    adaptor: "central",
    uuid: process.env.ADDRESS,
    module: "cylon-ble"
  })
  .device("ollie", { driver: "ollie", module: "cylon-sphero-ble" })
  .on("ready", function(bot) {
    every((1).second(), function() {
      bot.ollie.randomColor();
    });
  });

Cylon.start();
