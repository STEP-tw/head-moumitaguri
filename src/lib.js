const { printNotFoundError, hasIllegalInputs,
  showError
} = require('./errorCheck.js');

const getNChars = function (fileContent, count, context) {
  if (context == "tail") {
    return fileContent.substr(-count, count);
  }
  return fileContent.substr(0, count);
}


const getNLines = function (fileContent, count, context) {
  if (context == "tail") {
    return fileContent
      .split("\n")
      .reverse()
      .slice(0, count)
      .reverse()
      .join("\n");

  }
  return fileContent.split("\n").slice(0, count).join("\n");
}

const displayFileName = function (fileName) {
  return "==> " + fileName + " <==";
};


const addHeader = function (fileContent, fileHeader, files) {
  if (files.length > 1) {
    return fileHeader + fileContent;
  }
  return fileContent;

}

const formatFileContent = function (parsedInputs, context, { existsSync, readFileSync }, file) {
  if (!existsSync(file)) {
    return printNotFoundError(file, context);
  }
  return fetchFileContents(parsedInputs, context, readFileSync, file);
}

const fetchFileContents = function ({ option, count, files }, context, readFileSync, file) {
  let fileHeader = displayFileName(file) + "\n";
  let content = readFileSync(file, "utf8");
  let fileContent = selectAndPerformAction(content, option, count, context);
  return addHeader(fileContent, fileHeader, files);
}


const selectAndPerformAction = function (fileContent, option = "n", count, context) {
  let action = {
    n: getNLines,
    c: getNChars
  };
  return action[option](fileContent, count, context);
}


const extractFiles = function (
  { option, count, files },
  context,
  fs
) {
  let joinWith = "\n\n";
  let validateFile = formatFileContent.bind(null, { option, count, files }, context, fs);
  return files
    .map(validateFile)
    .join(joinWith);
};


const runCommand = function (parsedInputs, context, fs) {
  if (hasIllegalInputs(parsedInputs)) {
    return showError(parsedInputs, context);
  }
  return extractFiles(parsedInputs, context, fs);
}

module.exports = {
  getNChars,
  getNLines,
  displayFileName,
  formatFileContent,
  fetchFileContents,
  selectAndPerformAction,
  extractFiles,
  runCommand
};