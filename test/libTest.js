const { equal, deepEqual } = require('assert');
const { readFile, split } = require('../src/lib.js');

const add = function(num1,num2){
  return num1 + num2 ;
}

describe('readFile()', function(){
  it('should take a function and two arguments as input and return the evaluated value of the input function for the given arguments', function(){
    
    equal(readFile(add,1,2),3);
  });
});


describe('split()', function(){
  it('should take a string and a separator as input and split the given string by the given separator', function(){
   let spliter = split("take a\n break");
    deepEqual(spliter(" "),['take','a\n','break']);
    deepEqual(spliter("\n"),['take a',' break']);
  });
});

