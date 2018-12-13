const { isOptionIllegal,
  isCountIllegal,
  isIllegalOffset,
  printHeadIllegalCountError,
  printHeadIllegalOptionUsageErrorMessage,
  printTailIllegalOffsetError,
  printTailIllegalOptionUsageError
} = require('./errorCheck.js');

const getNChars = function (fileContent, count, context) {
  if (context == "head") {
    return fileContent.substr(0, count);
  }
  return fileContent.substr(-count, count);
}

const getLastNChars = function (fileContent, numberOfChars) {
  return fileContent
    .split("")
    .reverse()
    .slice(0, numberOfChars)
    .reverse()
    .join("");
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
const getLastNLines = function (fileContent, numberOfLines) {
  return fileContent
    .split("\n")
    .reverse()
    .slice(0, numberOfLines)
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


const head = function (doesExist, readFunc, parsedInputs, context) {
  if (isOptionIllegal(parsedInputs.option)) {
    return printHeadIllegalOptionUsageErrorMessage(parsedInputs.option);
  }
  if (isCountIllegal(parsedInputs.count)) {
    return printHeadIllegalCountError(parsedInputs.count, parsedInputs.option);
  }
  return extractFiles(doesExist, readFunc, parsedInputs, context);
};



const tailFiles = function (
  doesExist,
  readFunc,
  { option, offset, files }
) {
  let joinWith = "\n\n";
  return files
    .map(file => {
      if (!doesExist(file)) {
        return "tail: " + file + notFound;
      }
      let fileHeader = displayFileName(file) + "\n";
      let fileContent = readFunc(file, "utf8");
      let extractedContent;
      if (option == "n") {
        extractedContent = getLastNLines(fileContent, offset);
      }
      if (option == "c") {
        extractedContent = getLastNChars(fileContent, offset);
      }
      if (files.length > 1) {
        return fileHeader + extractedContent;
      }
      return extractedContent;
    })
    .join(joinWith);
};


const tail = function (doesExist,
  readFunc,
  { option, offset, files }
) {
  if (isOptionIllegal(option)) {
    return printTailIllegalOptionUsageError(option);
  }
  if (isIllegalOffset(offset)) {
    return printTailIllegalOffsetError(offset);
  }

  return tailFiles(doesExist, readFunc, { option, offset, files });
}

module.exports = {
  getLastNChars,
  getLastNLines,
  displayFileName,
  extractFiles,
  tailFiles,
  head,
  tail,
  isCountIllegal,
  isOptionIllegal,
  isIllegalOffset
};
