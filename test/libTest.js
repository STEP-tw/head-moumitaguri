const { equal, deepEqual } = require('assert');
const { readFile } = require('../src/lib.js');

const add = function(num1,num2){
  return num1 + num2 ;
}

describe('readFile()', function(){
  it('should take a function and two arguments as input and return the evaluated value of the input function for the given arguments', function(){
    
    equal(readFile(add,1,2),3);
  });
});

