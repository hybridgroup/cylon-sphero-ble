# Cylon.js For Ollie

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things (IoT).

This repository contains the Cylon.js adaptor/drivers to connect to the Ollie from Orbotix (http://www.gosphero.com/ollie/).

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-ollie.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-ollie) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-ollie/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-ollie) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-ollie/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-ollie)

## How to Install

    $ npm install cylon cylon-ollie

## How to Use

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'central', uuid: 'cc360e85785e', module: 'cylon-ble'}
  },

  devices: {
    ollie: { driver: 'ollie'}
  },

  work: function(my) {
    my.ollie.wake(function(err, data){
      console.log("wake");

      after(200, function() {
        my.ollie.setRGB(0x00FFFF);
      });

      after(500, function() {
        my.ollie.setRGB(0xFF0000);
        my.ollie.roll(60, 0, 1);

        after(1000, function(){
          my.ollie.roll(60, 90, 1);

          after(1000, function(){
            my.ollie.stop();
          });
        });
      });
    });
  }
}).start();
```

## How to Connect

Before you will be able to program the Ollie, you will need to put it into "developer mode" using a compatible mobile app. If you do not have an app that can do this, you will not be able to use cylon-ollie.

You then need to determine the `uuid` of your Ollie. One way to do this, is to use the `cylon-ble-scan` command line utility installed as part of [cylon-ble](https://github.com/hybridgroup/cylon-ble).

Once you know your `uuid` substititute it into your code, and away you go!

## Documentation

We're busy adding documentation to [cylonjs.com](http://cylonjs.com). Please check there as we continue to work on Cylon.js.

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-ollie/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-ollie/blob/master/RELEASES.md
).

## License

Copyright (c) 2014-2015 The Hybrid Group. Licensed under the Apache 2.0 license.
