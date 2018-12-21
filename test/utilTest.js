const assert = require("assert");

const { isOption, isDash, isNumber, getSubstr, splitContent } = require("../src/util.js");

describe("isOption", function() {
  it("should return true when input is NaN", function() {
    let actualOut = isOption("n");
    let expectedOut = true;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return false when input is number", function() {
    let actualOut = isOption(1);
    let expectedOut = false;
    assert.deepEqual(actualOut, expectedOut);
  });
});

describe("isNumber", function() {
  it("should return true when input is number", function() {
    let actualOut = isNumber(1);
    let expectedOut = true;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return false when input is NaN", function() {
    let actualOut = isNumber("c");
    let expectedOut = false;
    assert.deepEqual(actualOut, expectedOut);
  });
});

describe("isDash", function() {
  it("should return true when input is dash", function() {
    let actualOut = isDash("-");
    let expectedOut = true;
    assert.deepEqual(actualOut, expectedOut);
  });
  it("should return false when input is not dash", function() {
    let actualOut = isDash("<");
    let expectedOut = false;
    assert.deepEqual(actualOut, expectedOut);
  });
});

describe ('getSubstr' , function() {
  it('should return substring of the specified string according to the bounds', function(){
    let bound = { lower : 0, upper : 2 };
    let content = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let actualOut = getSubstr(content, bound);
    let expectedOut = "1\n"
    assert.deepEqual(actualOut, expectedOut);
  });
});

describe ('splitContent' , function() {
  it ('should return splitted string of the specified string according to the specified bounds' , function() {
    let bound = { lower : 0, upper : 3 };
    let content = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    let actualOut = splitContent(content, bound);
    let expectedOut = "1\n2\n3";
    assert.deepEqual(actualOut, expectedOut);
  });
});
