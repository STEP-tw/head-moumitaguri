const { equal, deepEqual } = require("assert");
const { parseInputs } = require("../src/io.js");

describe("parseInputs() => should return an object having option : n ,count : 10,files : fileList,key-value-pairs", function() {
  it('should work for input => headArgs = ["-n5","file"]', function() {
    headArgs = ["-n5", "file"];
    parsedInput = { option: "n", count: 5, files: ["file"] };
    deepEqual(parseInputs(headArgs), parsedInput);
  });
  it('should work for input => headArgs = ["-c5","file"]', function() {
    headArgs = ["-c5", "file"];
    parsedInput = { option: "c", count: 5, files: ["file"] };
    deepEqual(parseInputs(headArgs), parsedInput);
  });
  it('should work for input => headArgs = ["-n5","file","file2"]', function() {
    headArgs = ["-n5", "file", "file2"];
    parsedInput = { option: "n", count: 5, files: ["file", "file2"] };
    deepEqual(parseInputs(headArgs), parsedInput);
  });
  it('should work for input => headArgs = ["-c5","file","file2"]', function() {
    headArgs = ["-c5", "file", "file2"];
    parsedInput = { option: "c", count: 5, files: ["file", "file2"] };
    deepEqual(parseInputs(headArgs), parsedInput);
  });
  it('should work for input => headArgs = ["-n",5,"file","file2"]', function() {
    headArgs = ["-n", "5", "file", "file2"];
    parsedInput = { option: "n", count: 5, files: ["file", "file2"] };
    deepEqual(parseInputs(headArgs), parsedInput);
  });
  it('should work for input => headArgs = ["-5","file","file2"]', function() {
    headArgs = ["-5", "file", "file2"];
    parsedInput = { option: "n", count: 5, files: ["file", "file2"] };
    deepEqual(parseInputs(headArgs), parsedInput);
  });
  it('should work for input => headArgs = ["--","file","file2"]', function() {
    headArgs = ["--", "file", "file2"];
    parsedInput = { option: "n", count: 10, files: ["file", "file2"] };
    deepEqual(parseInputs(headArgs), parsedInput);
  });
});