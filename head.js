const { runCommand } = require("./src/lib.js");
const { parseInputs } = require("./src/input.js");
const fs = require("fs");

const main = function() {
  let headArgs = process.argv.slice(2);
  let parsedInputs = parseInputs(headArgs);
  console.log(runCommand(parsedInputs, "head", fs));
};

main();
