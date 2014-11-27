var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'bluetooth', adaptor: 'central', uuid: 'cc360e85785e', module: 'cylon-ble'},
  device: {name: 'ollie', driver: 'ollie'},

  work: function(my) {
    my.ollie.wake(function(err, data){
      my.ollie.setRGB(0xFF0000);
      my.ollie.setRawMotorValues(0x01, 200, 0x02, 200);
      after(2000, function(){
        my.ollie.setRawMotorValues(0x02, 200, 0x01, 200);

        after(2000, function(){
          my.ollie.stop();
        });                
      });
    });
  }
}).start();
