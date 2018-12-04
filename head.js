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

const { readFile,getFile,getFirstNLines } = require('./src/lib.js');
const readFileSync = require('fs').readFileSync;

const main = function(){
  let path = './'+process.argv[2];
  let fileContent = readFile(readFileSync,path,'utf8');
  let fileDetails = getFile(path,fileContent);
  console.log(getFirstNLines(fileDetails));
}

main();
