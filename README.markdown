# Cylon.js For Ollie

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics, physical computing, and the Internet of Things using Node.js

This repository contains the Cylon adaptor/drivers to connect to the Ollie from Orbotix (http://www.gosphero.com/ollie/).

For more information about Cylon, check out the repo at
https://github.com/hybridgroup/cylon

## Getting Started

Install the module with: `npm install cylon-ollie`

## Example

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'bluetooth', adaptor: 'central', uuid: 'cc360e85785e', module: 'cylon-ble'},
  device: {name: 'ollie', driver: 'ollie'},

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
## Connecting

Before you will be able to program the Ollie, you will need to put it into "developer mode" using a compatible mobile app. If you do not have an app that can do this, you will not be able to use cylon-ollie.

You then need to determine the `uuid` of your Ollie. One way to do this, is to use the `cylon-ble-scan` command line utility installed as part of [cylon-ble](https://github.com/hybridgroup/cylon-ble).

Once you know your `uuid` substititute it into your code, and away you go!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & lint and test your code using `make test` and `make lint`.
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

None yet...

## License

Copyright (c) 2014 The Hybrid Group. Licensed under the Apache 2.0 license.
