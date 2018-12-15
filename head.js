const { runCommand } = require("./src/lib.js");
const { parseInputs } = require("./src/parseInput.js");
const fs = require('fs');

const main = function () {
  let headArgs = process.argv.slice(2);
  let context = process.argv.slice(1)[0].substr(-7,4);
  let parsedInputs = parseInputs(headArgs);
  console.log(runCommand( parsedInputs,context,fs));
  };

main();