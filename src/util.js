const parseInputs = function(files,option){
  let parsedInput = { option : '-n', optionValue : 10, files  : files.slice(0) };

  if(option){
    option = option.join("");
    parsedInput.option = option.slice(0,2);
    parsedInput.optionValue = +option.slice(2);
  }
  return parsedInput;
}

module.exports = { parseInputs };
