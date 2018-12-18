const assert = require("assert");

const {
  isOptionIllegal,
  isHeadCountIllegal,
  isIllegalOffset
} = require("../src/errorCheck.js");

describe("isOptionIllegal", function() {
  it("should return false when option is n", function() {
    let actualOut = isOptionIllegal("n");
    let expectedOut = false;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return false when option is c", function() {
    let actualOut = isOptionIllegal("c");
    let expectedOut = false;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return true when option is neither n nor c", function() {
    let actualOut = isOptionIllegal("t");
    let expectedOut = true;
    assert.deepEqual(actualOut, expectedOut);
  });
});

describe("isHeadCountIllegal()", function() {
  it("should return true when count is 0", function() {
    assert.deepEqual(isHeadCountIllegal(0), true);
  });
  it("should return true when count is negative", function() {
    assert.deepEqual(isHeadCountIllegal(-1), true);
  });
  it("should return true when count is NaN", function() {
    assert.deepEqual(isHeadCountIllegal("n"), true);
  });
  it("should return false when count is > 1", function() {
    assert.deepEqual(isHeadCountIllegal(2), false);
  });
});

describe("isIllegalOffset()", function() {
  it("should return false when offset is 0", function() {
    assert.deepEqual(isIllegalOffset(0), false);
  });
  it("should return true when offset is NaN", function() {
    assert.deepEqual(isIllegalOffset("n"), true);
  });
});
