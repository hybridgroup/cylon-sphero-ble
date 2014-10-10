/*
 * cylon-ollie adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 Your Name Here
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Adaptor = module.exports = function Adaptor(opts) {
  if (opts == null) {
    opts = {};
  }

  Adaptor.__super__.constructor.apply(this, arguments);
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

// Include a list of commands that will be make availble to the connection;
// which means they will be used by the drivers.
Adaptor.prototype.commands = [];

Adaptor.prototype.connect = function(callback) {
  Adaptor.__super__.connect.apply(this, arguments);
};
