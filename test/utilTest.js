const assert = require('assert');

const { isOption,
    isDash,
    isNumber
} = require('../src/util.js');

describe('isOption', function () {
    it('should return true when input is NaN', function () {
        let actualOut = isOption("n");
        let expectedOut = true;
        assert.deepEqual(actualOut, expectedOut);
    });
    it('should return false when input is number', function () {
        let actualOut = isOption(1);
        let expectedOut = false;
        assert.deepEqual(actualOut, expectedOut);
    });
});

describe('isNumber', function () {
    it('should return true when input is number', function () {
        let actualOut = isNumber(1);
        let expectedOut = true;
        assert.deepEqual(actualOut, expectedOut);
    });
    it('should return false when input is NaN', function(){
        let actualOut = isNumber("c");
        let expectedOut = false;
        assert.deepEqual(actualOut, expectedOut);
    });
});

describe('isDash()', function () {
    it('should check if input is - and return true or false', function () {
        assert.deepEqual(isDash("-"), true);
        assert.deepEqual(isDash("<"), false);
    });
});
