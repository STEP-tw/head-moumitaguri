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



const { tail } = require("./src/lib.js");

const { parseInputs } = require("./src/tailIO.js");
const { readFileSync, existsSync } = require("fs");

const main = function() {
  let tailArgs = process.argv.slice(2);
  let parsedInputs = parseInputs(tailArgs);
  console.log(tail(existsSync, readFileSync, parsedInputs));
};

main();
