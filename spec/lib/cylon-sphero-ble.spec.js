"use strict";

var ollie = lib("../");

var Driver = lib("driver");

describe("Cylon.Ollie", function() {
  describe("#driver", function() {
    it("returns an instance of the Driver", function() {
      var args = { device: {connection: "test"} };
      expect(ollie.driver(args)).to.be.instanceOf(Driver);
    });
  });
});
