"use strict";

var Ollie = source("driver");

describe("Cylon.Drivers.Ollie", function() {
  var driver = new Ollie({
    device: { connection: "connect" }
  });

  it("needs tests", function() {
    expect(driver).to.be.an.instanceOf(Ollie);
  });
});
