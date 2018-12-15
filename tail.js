/* 
  Usage:
  node ./tail.js file1
  node ./tail.js -n5 file1
  node ./tail.js -n 5 file1
  node ./tail.js -5 file1
  node ./tail.js file1 file2
  node ./tail.js -n 5 file1 file2
  node ./tail.js -n5 file1 file2
  node ./tail.js -5 file1 file2 
  node ./tail.js -c5 file1
  node ./tail.js -c 5 file1
  node ./tail.js -c5 file1 file2
  node ./tail.js -c 5 file1 file2
*/



const { runCommand } = require("./src/lib.js");

const { parseInputs } = require("./src/parseInput.js");
const fs = require('fs');

const main = function () {
  let tailArgs = process.argv.slice(2);
  let context = process.argv.slice(1)[0].substr(-7, 4);
  let parsedInputs = parseInputs(tailArgs);
  console.log(runCommand(parsedInputs, context, fs));
};

main();
