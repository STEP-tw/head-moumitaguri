const { equal, deepEqual } = require('assert');

const { isOptionIllegal,
  isCountIllegal,
  isIllegalOffset,
  printHeadIllegalCountError,
  printHeadIllegalOptionUsageErrorMessage,
  printTailIllegalOffsetError,
  printTailIllegalOptionUsageError
} = require('../src/errorCheck.js');



describe('isOptionIllegal()', function () {
  it('should check if option is n and return false ', function () {
    deepEqual(isOptionIllegal("n"), false);
  });
  it('should check if option is c and return false', function () {
    deepEqual(isOptionIllegal("c"), false);
  });
  it('should check if option is neither n nor c and return true', function () {
    deepEqual(isOptionIllegal("t"), true);
  });
});

describe('isCountIllegal()', function () {
  it('should return true when count is 0', function () {
    deepEqual(isCountIllegal(0), true);
  });
  it('should return true when count is negative', function () {
    deepEqual(isCountIllegal(-1), true);
  });
  it('should return true when count is NaN', function () {
    deepEqual(isCountIllegal("n"), true);
  });
  it('should return false when count is > 1', function () {
    deepEqual(isCountIllegal(2), false);
  });
});

describe('isIllegalOffset()', function () {
  it('should return false when offset is 0', function () {
    deepEqual(isIllegalOffset(0), false);
  });
  it('should return true when offset is NaN', function () {
    deepEqual(isIllegalOffset("n"), true);
  });
});

describe('printHeadIllegalCountError()', function () {
  it('should return string showing illegal line count error ', function () {
    deepEqual(printHeadIllegalCountError(0, "n"), "head: illegal line count -- 0");
  });
  it('should return string showing illegal byte count error ', function () {
    deepEqual(printHeadIllegalCountError(0, "c"), "head: illegal byte count -- 0");
  });
});

describe('printHeadIllegalOptionUsageErrorMessage()', function () {
  it('should return string showing illegal option error', function () {
    deepEqual(printHeadIllegalOptionUsageErrorMessage("v"), "head: illegal option -- v\nusage: head [-n lines | -c bytes] [file ...]");
  });
});


describe('printTailIllegalOffsetError()', function () {
  it('should return string showing illegal offset error < 0 ', function () {
    deepEqual(printTailIllegalOffsetError(-1), "tail: illegal offset -- -1");
  });
  it('should return string showing illegal offset NaN ', function () {
    deepEqual(printTailIllegalOffsetError("c"), "tail: illegal offset -- c");
  });
});

describe('printTailIllegalOptionUsageError()', function () {
  it('should return string showing illegal option error', function () {
    deepEqual(printTailIllegalOptionUsageError("v"), "tail: illegal option -- v\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]");
  });
});
