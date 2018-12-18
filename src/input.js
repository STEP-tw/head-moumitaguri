const { isOption, isNumber, isDash
} = require('./util.js');

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

   if (areOptionCountTogether(args[0])) {
      parsedInput = splitWhenOptionCountTogether(args, parsedInput);
   }
   if (areOptionCountSeparated(args[0])) {
      parsedInput = splitWhenOptionCountSeparated(args, parsedInput);
   }
   if (isOnlyCountGiven(args[0])) {
      parsedInput = splitWhenOnlyCountGiven(args, parsedInput);
   }
   return parsedInput;
};

module.exports = { parseInputs };