const parseInputs = function(headArgs) {
  let parsedInput = { option: "n", count: 10, files: [...headArgs] };

  if (
    headArgs[0].length >= 3 &&
    headArgs[0][0] == "-" &&
    isNaN(headArgs[0][1])
  ) {
    parsedInput.option = headArgs[0][1];
    parsedInput.count = headArgs[0].slice(2);
    parsedInput.files = headArgs.slice(1);
  }

  if (
    headArgs[0].length == 2 &&
    headArgs[0][0] == "-" &&
    isNaN(headArgs[0][1])
  ) {
    parsedInput.option = headArgs[0][1];
    parsedInput.count = headArgs[1];
    parsedInput.files = headArgs.slice(2);
  }

  if (
    headArgs[0].length == 2 &&
    headArgs[0][0] == "-" &&
    headArgs[0][1] == "-"
  ) {
    parsedInput.option = "n";
    parsedInput.count = 10;
    parsedInput.files = headArgs.slice(1);
  }

  if (headArgs[0].length >= 2 && !isNaN(headArgs[0].slice(1))) {
    parsedInput.count = headArgs[0].slice(1);
    parsedInput.files = headArgs.slice(1);
  }

  return parsedInput;
};

module.exports = { parseInputs };
