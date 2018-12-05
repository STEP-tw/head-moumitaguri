const { equal, deepEqual } = require('assert');
const { getFirstNChars, getFirstNLines, displayFileName } = require('../src/lib.js');


describe('getFirstNChars()', function(){
  it('should return empty string when input is empty string and numberOfChars = 0', function(){
    deepEqual(getFirstNChars('file',0),'');
  });
  it('should return string of n characters when numberOfChars = n', function(){
    deepEqual(getFirstNChars('file',1),'f');
  });
  it('should return string of n characters when input string has n chars and numberOfChars > n', function(){
    deepEqual(getFirstNChars('file',5),'file');
  });
});




describe('getFirstNLines', function(){
    content = 'get a file\nsave it\nedit it\nagain save it';
  it('should return one line for input 1 ', function(){
    deepEqual(getFirstNLines(content,1),'get a file');
  });
  it('should return n lines  of the given file when n is given ', function(){
    deepEqual(getFirstNLines(content,3),'get a file\nsave it\nedit it');
  });
  it('should return all  lines of the given file when numberOfLines is not provided as it is default as 10 ', function(){
    deepEqual(getFirstNLines(content),'get a file\nsave it\nedit it\nagain save it');
  });
});


describe('displayFileName()', function(){
  it('should print ==> text  <== for input "text"', function(){
    deepEqual(displayFileName('text'),'==> text <==');
  });
});
