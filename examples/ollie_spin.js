var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'bluetooth', adaptor: 'central', uuid: 'cc360e85785e', module: 'cylon-ble'},
  device: {name: 'ollie', driver: 'ollie'},

  work: function(my) {
    my.ollie.wake(function(err, data){
      my.ollie.setRGB(0xFF0000);
      my.ollie.setRawMotorValues(my.ollie.MotorForward, 200, my.ollie.MotorReverse, 200);
      after(2000, function(){
        my.ollie.setRawMotorValues(my.ollie.MotorReverse, 200, my.ollie.MotorForward, 200);

        after(2000, function(){
          my.ollie.stop();
        });                
      });
    });
  }
}).start();
