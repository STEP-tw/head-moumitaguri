const assert = require("assert");

const {
  isOptionIllegal,
  isHeadCountIllegal,
  isIllegalOffset
} = require("../src/errorCheck.js");

describe("isOptionIllegal", function () {
  it("should return false when option is n", function () {
    let actualOut = isOptionIllegal("n");
    let expectedOut = false;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return false when option is c", function () {
    let actualOut = isOptionIllegal("c");
    let expectedOut = false;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return true when option is neither n nor c", function () {
    let actualOut = isOptionIllegal("t");
    let expectedOut = true;
    assert.deepEqual(actualOut, expectedOut);
  });
});

describe("isHeadCountIllegal", function () {
  it("should return true when count is 0", function () {
    let actualOut = isHeadCountIllegal(0);
    let expectedOut = true;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return true when count is negative", function () {
    let actualOut = isHeadCountIllegal(-1);
    let expectedOut = true;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return true when count is NaN", function () {
    let actualOut = isHeadCountIllegal("n");
    let expectedOut = true;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return false when count is > 1", function () {
    let actualOut = isHeadCountIllegal(2);
    let expectedOut = false;
    assert.deepEqual(actualOut, expectedOut);
  });
});

describe("isIllegalOffset()", function () {
  it("should return false when offset is 0", function () {
    let actualOut = isIllegalOffset(0);
    let expectedOut = false;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return true when offset is NaN", function () {
    let actualOut = isIllegalOffset("n");
    let expectedOut = true;
    assert.deepEqual(actualOut, expectedOut);
  });
});
