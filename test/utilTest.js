const { equal, deepEqual } = require('assert');
const { parseInputs } = require('../src/util.js');

describe('parseInputs()', function(){
  it('should return a object where in files key the given files will be in array', function(){
    deepEqual(parseInputs(['file1']),{option : '-n', numberOfLines : 10, files : ['file1'] });
  });
});
