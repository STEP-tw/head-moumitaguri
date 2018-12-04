const { equal, deepEqual } = require('assert');
const { readFile, split, getFirstNChars, getFile } = require('../src/lib.js');

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


describe('getFirstNChars()', function(){
  it('should return empty string when input is empty string and numberOfChars = 0', function(){
    deepEqual(getFirstNChars('',0),'');
  });
  it('should return string of n characters when numberOfChars = n', function(){
    deepEqual(getFirstNChars('day',1),'d');
  });
  it('should return string of n characters when input string has n chars and numberOfChars > n', function(){
    deepEqual(getFirstNChars('day',4),'day');
  });
});


describe('getFile => fileContentInLines', function(){
  it('should return an array with empty string when fileContent is empty string', function(){
    let file = getFile('abc','');
    deepEqual(file.fileContentInLines(),['']);
  });
  it('should return an array with given fileContent in  one line', function(){
    file = getFile('abc','get a file');
    deepEqual(file.fileContentInLines(),['get a file']);
  });
  it('should return an array with given fileContent in lines', function(){
    file = getFile('abc','get a file\nsave it\nedit it\nagain save it');
    deepEqual(file.fileContentInLines(),['get a file','save it','edit it','again save it']);
  });
});
