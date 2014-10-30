"use strict";

var module = source("cylon-ollie");

var Driver = source('driver');

describe("Cylon.Ollie", function() {
  describe("#register", function() {
    it("should be a function", function() {
      expect(module.register).to.be.a('function');
    });
  });

  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      var args = { device: {connection: 'test'} };
      expect(module.driver(args)).to.be.instanceOf(Driver);
    });
  });
});
