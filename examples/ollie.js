var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'bluetooth', adaptor: 'ble', uuid: 'd05efa93b552'},
  devices: [{name: 'battery', driver: 'ble-battery-service'},
            {name: 'deviceInfo', driver: 'ble-device-information'},
            {name: 'generic', driver: 'ble-generic-access'},
            {name: 'ollie', driver: 'ollie'}],

  display: function(err, data) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("Data:", data);
    }
  },

  work: function(my) {
    my.generic.getDeviceName(function(err, data){
      my.display(err, data);
      my.generic.getAppearance(function(err, data){
        my.display(err, data);
        my.deviceInfo.getManufacturerName(function(err, data){
          my.display(err, data);
          my.ollie.wake(function(err, data){
            console.log("wake");
            // my.ollie.getData(function(err, data) {
            //   console.log(err, data);
            // });
            after(200, function() {
              console.log("color");
              my.ollie.setRGB(0x00FFFF);
            });
            after(500, function() {
              console.log("color");
              my.ollie.setRGB(0xFF0000);
            });
          });
        });
      });
    });
  }
}).start();
