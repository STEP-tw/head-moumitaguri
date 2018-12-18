const assert = require('assert');

const { createHeading,
    showError,
    printNotFoundError
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
        it('for tail', function () {
            let input = { option: "p", count: 3, files: ["numbers.txt"] };
            let actualOut = showError(input, "tail");
            let expectedOut = "tail: illegal option -- p";
            expectedOut += "\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
            assert.deepEqual(actualOut, expectedOut);
        });
    });

    describe('should return error when count is illegal', function () {
        describe('for head', function () {
            it('line count error when count is 0 ', function () {
                let input = { option: "n", count: 0, files: ["numbers.txt"] };
                let actualOut = showError(input, "head");
                let expectedOut = "head: illegal line count -- 0";
                assert.deepEqual(actualOut, expectedOut);
            });
            it('byte count error when count is 0 ', function () {
                let input = { option: "c", count: 0, files: ["numbers.txt"] };
                let actualOut = showError(input, "head");
                let expectedOut = "head: illegal byte count -- 0";
                assert.deepEqual(actualOut, expectedOut);
            });
            it('line count error when count is negative', function () {
                let input = { option: "n", count: -4, files: ["numbers.txt"] };
                let actualOut = showError(input, "head");
                let expectedOut = "head: illegal line count -- -4"
                assert.deepEqual(actualOut, expectedOut);
            });
            it('line count error when count is NaN', function () {
                let input = { option: "n", count: "u", files: ["numbers.txt"] };
                let actualOut = showError(input, "head");
                let expectedOut = "head: illegal line count -- u";
                assert.deepEqual(actualOut, expectedOut);
            });
            describe('for tail', function () {
                it('when count is NaN', function () {
                    let input = { option: "n", count: "u", files: ["numbers.txt"] };
                    let actualOut = showError(input, "tail");
                    let expectedOut = "tail: illegal offset -- u";
                    assert.deepEqual(actualOut, expectedOut);
                });
            });
        });
    });
});

describe ('printNotFoundError' , function() {
    it ('should return error when context is head' , function() {
        let actualOut = printNotFoundError("numbers.txt","head");
        let expectedOut = "head: numbers.txt: No such file or directory";
        assert.deepEqual(actualOut, expectedOut);
    });
    it ('should return error when context is tail' , function() {
        let actualOut = printNotFoundError("numbers.txt","tail");
        let expectedOut = "tail: numbers.txt: No such file or directory";
        assert.deepEqual(actualOut, expectedOut);    
    });
});