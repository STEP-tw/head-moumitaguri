const { runCommand } = require("./src/lib.js");

const { parseInputs } = require("./src/input.js");
const fs = require("fs");

const main = function() {
  let tailArgs = process.argv.slice(2);
  let parsedInputs = parseInputs(tailArgs);
  console.log(runCommand(parsedInputs, "tail", fs));
};

main();
