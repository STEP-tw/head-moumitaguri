const { equal, deepEqual } = require('assert');
const { readFile, split, getFirstNChars, getFile, getFirstNLines, extractOptions,displayFileName } = require('../src/lib.js');

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
    let file = getFile('abc','');
    deepEqual(getFirstNChars(file,0),'');
  });
  it('should return string of n characters when numberOfChars = n', function(){
    file = getFile('abc','day');
    deepEqual(getFirstNChars(file,1),'d');
  });
  it('should return string of n characters when input string has n chars and numberOfChars > n', function(){
    file = getFile('abc','day');
    deepEqual(getFirstNChars(file,4),'day');
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


describe('getFirstNLines', function(){
  it('should return empty string for empty file', function(){
    file = getFile('abc','');
    deepEqual(getFirstNLines(file,0),'');
  });
  it('should return one line of the given file ', function(){
    file = getFile('abc','get a file\nsave it\nedit it\nagain save it');
    deepEqual(getFirstNLines(file,1),'get a file');
  });
  it('should return n lines  of the given file when n is given ', function(){
    file = getFile('abc','get a file\nsave it\nedit it\nagain save it');
    deepEqual(getFirstNLines(file,3),'get a file\nsave it\nedit it');
  });
  it('should return all  lines of the given file when numberOfLines is not provided as it is default as 10 ', function(){
    file = getFile('abc','get a file\nsave it\nedit it\nagain save it');
    deepEqual(getFirstNLines(file),'get a file\nsave it\nedit it\nagain save it');
  });
});


describe('extractOptions() ->extract the options from the given inputs', function(){
  it('should return false  when -n and -c option not found', function(){
    deepEqual(extractOptions(['node','x.js','-p']),false);
  });
  it('should return -n -c options in array when found in input', function(){
    deepEqual(extractOptions(['node','x.js','-c','-n']),['-c','-n']);
  });
});


describe('displayFileName()', function(){
  it('should print ==> text  <== for input "text"', function(){
    deepEqual(displayFileName('text'),'==> text <==');
  });
});
