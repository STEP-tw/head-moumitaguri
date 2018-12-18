const assert = require("assert");

const {
  isOptionIllegal,
  isHeadCountIllegal,
  isIllegalOffset
} = require("../src/errorCheck.js");

describe("isOptionIllegal()", function() {
  it("should check if option is n and return false ", function() {
    assert.deepEqual(isOptionIllegal("n"), false);
  });
  it("should check if option is c and return false", function() {
    assert.deepEqual(isOptionIllegal("c"), false);
  });
  it("should check if option is neither n nor c and return true", function() {
    assert.deepEqual(isOptionIllegal("t"), true);
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
