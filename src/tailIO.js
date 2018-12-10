const { isCase1ValidOptionCount,
        isCase2ValidOptionCount,
        isCase3ValidOptionCount,
        splitArgsForCase1,
        splitArgsForCase2,
        splitArgsForCase3
      } = require('../src/util.js');

const parseInputs = function(tailArgs) {
  let parsedInput = { option: "n", offset: 10, files: [...tailArgs] };

  //case1 example : (a) node ./tail.js -n5 file1
  //                (b) node ./tail.js -n15 file1 file2
  if (isCase1ValidOptionCount(tailArgs[0])) { 
      parsedInput = splitArgsForCase1(tailArgs,parsedInput);
  }
  //case2 example : (a) node ./tail.js -n 5 file1
  //                (b) node ./tail.js -c 5 file1 file2  
  if ( isCase2ValidOptionCount(tailArgs[0])) {
     parsedInput = splitArgsForCase2(tailArgs,parsedInput);
  }
  //case3 example : (a) node ./tail.js -5 file1
  //                (b) node ./tail.js -10 file1 file2
  if ( isCase3ValidOptionCount(tailArgs[0])) {
     parsedInput = splitArgsForCase3(tailArgs,parsedInput);
  }
  return parsedInput;
};

module.exports = { parseInputs };
