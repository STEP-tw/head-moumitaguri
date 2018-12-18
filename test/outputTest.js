const assert = require('assert');

const { createHeading,
    showError
} = require('../src/output.js');

describe('createHeading', function () {
    it('should take a string as input and return ==> string <== ', function () {
        let actualOut = createHeading("text");
        let expectedOut = "==> text <==";
        assert.equal(actualOut, expectedOut);
    });
});

describe('showError', function () {
    describe('should return error when option is neither n nor c', function () {
        it('for head ', function () {
            let input = { option: "p", count: 3, files: ["numbers.txt"] };
            let actualOut = showError(input, "head");
            let expectedOut = "head: illegal option -- p";
            expectedOut += "\nusage: head [-n lines | -c bytes] [file ...]";
            assert.deepEqual(actualOut, expectedOut);
        });
    });
    describe('should return error when count is illegal', function () {
        describe('for head', function () {
            it('when count is 0', function () {
                let input = { option: "n", count: 0, files: ["numbers.txt"] };
                let actualOut = showError(input, "head");
                let expectedOut = "head: illegal line count -- 0";
                assert.deepEqual(actualOut, expectedOut);
            });
            it('when count is negative', function () {
                let input = { option: "n", count: -4, files: ["numbers.txt"] };
                let actualOut = showError(input, "head");
                let expectedOut = "head: illegal line count -- -4"
                assert.deepEqual(actualOut, expectedOut);
            });
        });
    });
});