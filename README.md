# Cylon.js For Sphero BLE Robots

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT).

This repository contains the Cylon.js drivers to connect to the Sphero BB-8 and Sphero Ollie Bluetooth Low Energy (BLE) robots from Sphero (http://www.sphero.com/).

It was formerly named `cylon-ollie`, but is now renamed `cylon-sphero-ble` to better fit the new expanded functionality.

It uses the Sphero.js node module (https://github.com/orbotix/sphero.js) created by [@orbotix](https://github.com/orbotix) thank you!

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-sphero-ble.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-sphero-ble) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-sphero-ble/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-sphero-ble) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-sphero-ble/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-sphero-ble)

## How to Install

    $ npm install cylon cylon-sphero-ble

## How to Use

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'central', uuid: 'cc360e85785e', module: 'cylon-ble'}
  },

  devices: {
    bb8: { driver: 'bb8', module: 'cylon-sphero-ble'}
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
```

## How to Connect

Before you will be able to program the BB-8/Ollie, you will need to determine the BLE `address` of your robot. One way to do this, is to use the `cylon-ble-scan` command line utility installed as part of [cylon-ble](https://github.com/hybridgroup/cylon-ble).

Once you know your `address` substitute it into your code, and away you go!

You can run the examples in this repo like this:

```
ADDRESS="f3f26d557108" node examples/color.js
```

## Documentation

We're busy adding documentation to [cylonjs.com](http://cylonjs.com). Please check there as we continue to work on Cylon.js.

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-sphero-ble/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-sphero-ble/blob/master/RELEASES.md
).

## License

Copyright (c) 2014-2016 The Hybrid Group. Licensed under the Apache 2.0 license.
