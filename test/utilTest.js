const { equal, deepEqual } = require('assert');

const { isOption,
    isDash,
    isNumber,
    isCase1ValidOptionCount,
    isCase2ValidOptionCount,
    isCase3ValidOptionCount,
    splitArgsForCase1,
    splitArgsForCase2,
    splitArgsForCase3
} = require('../src/util.js');

describe('isOption()', function () {
    it('should check if input is NaN and return true or false', function () {
        deepEqual(isOption("n"), true);
        deepEqual(isOption(1), false);
    });
});

describe('isNumber()', function () {
    it('should check if input is a number and return true or false', function () {
        deepEqual(isNumber(1), true);
        deepEqual(isNumber("c"), false);
    });
});

describe('isDash()', function () {
    it('should check if input is - and return true or false', function () {
        deepEqual(isDash("-"), true);
        deepEqual(isDash("<"), false);
    });
});
