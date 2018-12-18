const { isOption, isNumber, isDash
} = require('./util.js');


//case1 example : (a) node ./tail.js -n5 file1
//                (b) node ./tail.js -n15 file1 file2 
const areOptionCountTogether = function (args) {
   return args.length >= 3 &&
      isDash(args[0]) &&
      isOption(args[1]);
}


const splitWhenOptionCountTogether = function (args, parsedInput) {
   parsedInput.count = args[0].slice(2);
   parsedInput.option = args[0][1];
   parsedInput.files = args.slice(1);
   return parsedInput;
}

//case2 example : (a) node ./tail.js -n 5 file1
//                (b) node ./tail.js -c 5 file1 file2
const areOptionCountSeparated = function (args) {
   return args.length == 2 &&
      isDash(args[0]) &&
      isOption(args[1]);
}

const splitWhenOptionCountSeparated = function (args, parsedInput) {
   parsedInput.option = args[0][1];
   parsedInput.count = args[1];
   parsedInput.files = args.slice(2);
   return parsedInput;
}


//case3 example : (a) node ./tail.js -5 file1
//                (b) node ./tail.js -10 file1 file2
const isOnlyCountGiven = function (args) {
   return args.length >= 2 &&
      isNumber(args.slice(1));
}

const splitWhenOnlyCountGiven = function (args, parsedInput) {
   parsedInput.count = args[0].slice(1);
   parsedInput.files = args.slice(1);
   return parsedInput;
}


const parseInputs = function (args) {
   let parsedInput = { option: "n", count: 10, files: [...args] };

   //case1 example : (a) node ./tail.js -n5 file1
   //                (b) node ./tail.js -n15 file1 file2
   if (areOptionCountTogether(args[0])) {
      parsedInput = splitWhenOptionCountTogether(args, parsedInput);
   }
   //case2 example : (a) node ./tail.js -n 5 file1
   //                (b) node ./tail.js -c 5 file1 file2  
   if (areOptionCountSeparated(args[0])) {
      parsedInput = splitWhenOptionCountSeparated(args, parsedInput);
   }
   //case3 example : (a) node ./tail.js -5 file1
   //                (b) node ./tail.js -10 file1 file2
   if (isOnlyCountGiven(args[0])) {
      parsedInput = splitWhenOnlyCountGiven(args, parsedInput);
   }
   return parsedInput;
};


module.exports = { parseInputs };
