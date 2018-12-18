const assert = require("assert");
const { parseInputs } = require("../src/input.js");

describe("parseInputs", function () {
  describe('should return parsed input object', function () {

    describe('when option and count are given together', function () {
      it('for single file', function () {
        let args = ["-n5", "file"];
        let actualOut = parseInputs(args);
        let expectedOut = { option: "n", count: 5, files: ["file"] };
        assert.deepEqual(actualOut, expectedOut);
      });

      it('for multiple files', function () {
        let args = ["-n5", "file", "file2"];
        let actualOut = parseInputs(args);
        let expectedOut = { option: "n", count: 5, files: ["file", "file2"] };
        assert.deepEqual(actualOut, expectedOut);
      });
    });
    describe('when option and count are given separately', function () {
      it('single file', function () {
        let args = ["-n", "5", "file"];
        let actualOut = parseInputs(args);
        expectedOut = { option: "n", count: 5, files: ["file"] };
        assert.deepEqual(actualOut, expectedOut);
      });

      it('multiple files', function () {
        let args = ["-n", "5", "file", "file2"];
        let actualOut = parseInputs(args);
        let expectedOut = { option: "n", count: 5, files: ["file", "file2"] };
        assert.deepEqual(actualOut, expectedOut);
      });
    });

    describe('when option is not specified and only count is specified', function () {
      describe('should return default parsed input object', function () {
        it('for single file', function () {
          let args = ["-5", "file"];
          let actualOut = parseInputs(args);
          let expectedOut = { option: "n", count: 5, files: ["file"] };
          assert.deepEqual(actualOut, expectedOut);
        });
        it('for multiple files', function () {
          let args = ["-5", "file", "file2"];
          let actualOut = parseInputs(args);
          let expectedOut = { option: "n", count: 5, files: ["file", "file2"] };
          assert.deepEqual(actualOut, expectedOut);
        });
      });
    });
  });
});