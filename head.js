/* 
  Usage:
  node ./head.js file1
  node ./head.js -n5 file1
  node ./head.js -n 5 file1
  node ./head.js -5 file1
  node ./head.js file1 file2
  node ./head.js -n 5 file1 file2
  node ./head.js -n5 file1 file2
  node ./head.js -5 file1 file2 
  node ./head.js -c5 file1
  node ./head.js -c 5 file1
  node ./head.js -c5 file1 file2
  node ./head.js -c 5 file1 file2
  */

const { head } = require('./src/lib.js');

const { parseInputs } = require('./src/util.js');
const { readFileSync,existsSync } = require('fs');

const main = function(){
  let headArgs = process.argv.slice(2);
  let parsedInputs = parseInputs(headArgs);
  console.log(head(existsSync,readFileSync,parsedInputs));
}

main();
