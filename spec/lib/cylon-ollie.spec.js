"use strict";

var module = source("cylon-ollie");

var Driver = source('driver');

describe("Cylon.Ollie", function() {
  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      var args = { device: {connection: 'test'} };
      expect(module.driver(args)).to.be.instanceOf(Driver);
    });
  });
});
