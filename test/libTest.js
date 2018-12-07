const { equal, deepEqual } = require('assert');
const { getFirstNChars, getFirstNLines, displayFileName,extractFiles } = require('../src/lib.js');


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

readFunc = function(file){ return file; }

doesExist = function(file){
  if(file == 'file does not exist'){
    return false;
  }
  return true;
}

describe('extractFiles()', function(){
    file = '0\n1\n2\n3\n4\n5\n6\n7\n8\n9';
  it('should return  given number of lines of file', function(){
    args = { option : 'n', optionValue : 1, files : [file] };
    deepEqual(extractFiles(doesExist,readFunc,args),'0');
  });
  it('should return  given number of chars of file', function(){
    args = { option : 'c', optionValue : 1, files : [file] };
    deepEqual(extractFiles(doesExist,readFunc,args),'0');
  });
  it('should return  given number of chars of file', function(){
    args = { option : 'c', optionValue : 2, files : [file] };
    deepEqual(extractFiles(doesExist,readFunc,args),'0\n');
  });
  it('should return the not found error message', function(){
    file = 'file does not exist';
    args = { option : 'c', optionValue : 2, files : [file] };
    deepEqual(extractFiles(doesExist,readFunc,args),'head: file does not exist: No such file or directory');

  });
  it('should return  given number of lines  of  multiple files', function(){
    file = '0\n1\n2\n3';
    file1 = 'a\nb\nc';
    expected = '==> 0\n1\n2\n3 <==\n0\n1\n\n==> a\nb\nc <==\na\nb'; 
    args = { option : 'n', optionValue : 2, files : [file,file1] };
    deepEqual(extractFiles(doesExist,readFunc,args),expected);
  });
});
