const { isOptionIllegal,
  isCountIllegal,
  isIllegalOffset,
  printHeadIllegalCountError,
  printHeadIllegalOptionUsageErrorMessage,
  printTailIllegalOffsetError,
  printTailIllegalOptionUsageError
} = require('./errorCheck.js');

const { hasIllegalInputs,
  showError
} = require('../src/errorCheck.js');

const getNChars = function (fileContent, count, context) {
  if (context == "head") {
    return fileContent.substr(0, count);
  }
  return fileContent.substr(-count, count);
}


const getNLines = function (fileContent, count, context) {
  if (context == "head") {
    return fileContent.split("\n").slice(0, count).join("\n");
  }
  return fileContent
    .split("\n")
    .reverse()
    .slice(0, count)
    .reverse()
    .join("\n");
}

const displayFileName = function (fileName) {
  return "==> " + fileName + " <==";
};

const notFound = ": No such file or directory";

const addHeader = function (fileContent, fileHeader, files) {
  if (files.length > 1) {
    return fileHeader + fileContent;
  }
  return fileContent;

}

const formatFileContent = function (doesExist, readFunc, parsedInputs, context, file) {
  if (!doesExist(file)) {
    return context + ": " + file + notFound;
  }
  return fetchFileContents(readFunc, parsedInputs, context, file);
}

const fetchFileContents = function (readFunc, { option, count, files }, context, file) {
  let fileHeader = displayFileName(file) + "\n";
  let content = readFunc(file, "utf8");
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
  doesExist,
  readFunc,
  { option, count, files },
  context
) {
  let joinWith = "\n\n";
  let validateFile = formatFileContent.bind(null, doesExist, readFunc, { option, count, files }, context);
  return files
    .map(validateFile)
    .join(joinWith);
};


const runCommand = function (doesExist, readFunc, parsedInputs, context) {
  if (hasIllegalInputs(parsedInputs)) {
    return showError(parsedInputs, context);
  }
  return extractFiles(doesExist, readFunc, parsedInputs, context);
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