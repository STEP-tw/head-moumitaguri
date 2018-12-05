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

const { readFile,getFile,getFirstNLines,extractOptions } = require('./src/lib.js');

const { parseInputs } = require('./src/util.js');
const readFileSync = require('fs').readFileSync;

const main = function(){
  let headArgs = process.argv.slice(2);
  let option = extractOptions(headArgs);
  let files = headArgs;

  if(option){
    files = headArgs.slice(1);
  }

  let parsedInputs = parseInputs(files,option);

  let path = './'+parsedInputs.files[0];
  let fileContent = readFile(readFileSync,path,'utf8');
  let fileDetails = getFile(path,fileContent);
  console.log(getFirstNLines(fileDetails,parsedInputs.optionValue));
}

main();
