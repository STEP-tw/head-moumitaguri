const { isOption, isNumber, isDash
} = require('../src/util.js');


/*const { isCase1ValidOptionCount,
        isCase2ValidOptionCount,
        isCase3ValidOptionCount,
        splitArgsForCase1,
        splitArgsForCase2,
        splitArgsForCase3
      } = require('../src/util.js');*/


//case1 example : (a) node ./tail.js -n5 file1
//                (b) node ./tail.js -n15 file1 file2 
const isCase1ValidOptionCount = function (args) {
   return args.length >= 3 &&
      isDash(args[0]) &&
      isOption(args[1]);
}


const splitArgsForCase1 = function (args, parsedInput) {
   parsedInput.count = args[0].slice(2);
   parsedInput.option = args[0][1];
   parsedInput.files = args.slice(1);
   return parsedInput;
}

//case2 example : (a) node ./tail.js -n 5 file1
//                (b) node ./tail.js -c 5 file1 file2
const isCase2ValidOptionCount = function (args) {
   return args.length == 2 &&
      isDash(args[0]) &&
      isOption(args[1]);
}

const splitArgsForCase2 = function (args, parsedInput) {
   parsedInput.option = args[0][1];
   parsedInput.count = args[1];
   parsedInput.files = args.slice(2);
   return parsedInput;
}


//case3 example : (a) node ./tail.js -5 file1
//                (b) node ./tail.js -10 file1 file2
const isCase3ValidOptionCount = function (args) {
   return args.length >= 2 &&
      isNumber(args.slice(1));
}

const splitArgsForCase3 = function (args, parsedInput) {
   parsedInput.count = args[0].slice(1);
   parsedInput.files = args.slice(1);
   return parsedInput;
}


const parseInputs = function (args) {
   let parsedInput = { option: "n", count: 10, files: [...args] };

   //case1 example : (a) node ./tail.js -n5 file1
   //                (b) node ./tail.js -n15 file1 file2
   if (isCase1ValidOptionCount(args[0])) {
      parsedInput = splitArgsForCase1(args, parsedInput);
   }
   //case2 example : (a) node ./tail.js -n 5 file1
   //                (b) node ./tail.js -c 5 file1 file2  
   if (isCase2ValidOptionCount(args[0])) {
      parsedInput = splitArgsForCase2(args, parsedInput);
   }
   //case3 example : (a) node ./tail.js -5 file1
   //                (b) node ./tail.js -10 file1 file2
   if (isCase3ValidOptionCount(args[0])) {
      parsedInput = splitArgsForCase3(args, parsedInput);
   }
   return parsedInput;
};

module.exports = { parseInputs };
