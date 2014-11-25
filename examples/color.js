var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'bluetooth', adaptor: 'central', uuid: 'cc360e85785e', module: 'cylon-ble'},
  device: {name: 'ollie', driver: 'ollie'},

  work: function(my) {
  	my.ollie.wake(function(err, data){
	    every((1).second(), function() {
	      my.ollie.setRGB(Math.floor(Math.random() * 100000));
	    });
	  });
  }
}).start();

