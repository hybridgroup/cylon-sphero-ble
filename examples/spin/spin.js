var Cylon = require('cylon');

Cylon.robot({
  connections: {
    bluetooth: { adaptor: 'central', uuid: 'cc361e85785e', module: 'cylon-ble'}
  },

  devices: {
    ollie: { driver: 'ollie'}
  },

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
