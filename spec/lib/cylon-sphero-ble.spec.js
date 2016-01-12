"use strict";

var spheroble = lib("../");

var Driver = lib("driver");

describe("Cylon.SpheroBLE", function() {
  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      var args = { device: {connection: "test"} };
      expect(spheroble.driver(args)).to.be.instanceOf(Driver);
    });
  });
});
