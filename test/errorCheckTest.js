const { equal, deepEqual } = require('assert');

const { isOptionIllegal,
    isCountIllegal,
    isIllegalOffset,
    printHeadIllegalCountError,
    printHeadIllegalOptionUsageErrorMessage,
    printTailIllegalOffsetError,
    printTailIllegalOptionUsageError
  } = require('../src/errorCheck.js');



describe('isOptionIllegal()' , function(){
    it('should check if option is n and return false ', function(){
      deepEqual(isOptionIllegal("n"),false);
    });
    it('should check if option is c and return false', function(){
      deepEqual(isOptionIllegal("c"),false);
    });
    it('should check if option is neither n nor c and return true', function(){
      deepEqual(isOptionIllegal("t"),true);
    });
  });
  
  describe('isCountIllegal()', function(){
    it('should return true when count is 0', function(){
      deepEqual(isCountIllegal(0),true);
    });
    it('should return true when count is negative', function(){
      deepEqual(isCountIllegal(-1),true);
    });
    it('should return true when count is NaN', function(){
      deepEqual(isCountIllegal("n"),true);
    });
    it('should return false when count is > 1', function(){
      deepEqual(isCountIllegal(2),false);
    });
  });
  
  describe('isIllegalOffset()', function(){
    it('should return true when offset is negative', function(){
      deepEqual(isIllegalOffset(-1),true);
    });
    it('should return false when offset is 0', function(){
      deepEqual(isIllegalOffset(0),false);
    });
    it('should return true when offset is NaN', function(){
      deepEqual(isIllegalOffset("n"),true);
    });
  });
  