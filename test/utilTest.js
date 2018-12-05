const { equal, deepEqual } = require('assert');
const { parseInputs } = require('../src/util.js');

describe('parseInputs()', function(){
  it('should return a object where in files key the given files will be in array', function(){
    deepEqual(parseInputs(['file1'],['-n4']),{option : '-n', optionValue : 4, files : ['file1'] });
  });
});
