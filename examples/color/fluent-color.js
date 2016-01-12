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
    every((1).second(), function() {
      bot.ollie.randomColor();
    });
  });

Cylon.start();
