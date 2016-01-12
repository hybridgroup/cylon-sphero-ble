"use strict";

var SpheroBLE = lib("driver");

describe("Cylon.Drivers.BB8", function() {
  var driver = new SpheroBLE({
    device: { connection: "connect", driver: "bb8" }
  });

  it("can create an Ollie", function() {
    expect(driver).to.be.an.instanceOf(SpheroBLE);
  });
});

describe("Cylon.Drivers.Ollie", function() {
  var driver = new SpheroBLE({
    device: { connection: "connect", driver: "ollie" }
  });

  it("can create an Ollie", function() {
    expect(driver).to.be.an.instanceOf(SpheroBLE);
  });
});
