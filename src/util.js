const parseInputs = function(files){
  let parsedInput = { option : '-n', numberOfLines : 10, files  : files.slice(0) };
  return parsedInput;
}

module.exports = { parseInputs };
