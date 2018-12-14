const isOption = function (option) {
    return isNaN(option);
}

const isNumber = function (count) {
    return !isNaN(count);
}

const isDash = function (option) {
    return option == "-";
}

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

module.exports = {
    isOption,
    isDash,
    isNumber,
    isCase1ValidOptionCount,
    isCase2ValidOptionCount,
    isCase3ValidOptionCount,
    splitArgsForCase1,
    splitArgsForCase2,
    splitArgsForCase3
}