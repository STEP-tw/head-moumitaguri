const { isOptionIllegal,
  isCountIllegal,
  isIllegalOffset,
  printHeadIllegalCountError,
  printHeadIllegalOptionUsageErrorMessage,
  printTailIllegalOffsetError,
  printTailIllegalOptionUsageError
} = require('./errorCheck.js');

const getFirstNChars = function (fileContent, numberOfChars) {
  return fileContent.slice(0, numberOfChars);
};

const getLastNChars = function (fileContent, numberOfChars) {
  return fileContent
    .split("")
    .reverse()
    .slice(0, numberOfChars)
    .reverse()
    .join("");
}
const getFirstNLines = function (fileContent, numberOfLines = 10) {
  return fileContent
    .split("\n")
    .slice(0, numberOfLines)
    .join("\n");
};
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

const extractFiles = function (
  doesExist,
  readFunc,
  { option, count, files }
) {
  let joinWith = "\n\n";
  return files
    .map(file => {
      if (!doesExist(file)) {
        return "head: " + file + notFound;
      }
      let fileHeader = displayFileName(file) + "\n";
      let fileContent = readFunc(file, "utf8");
      let extractedContent;
      if (option == "n") {
        extractedContent = getFirstNLines(fileContent, count);
      }
      if (option == "c") {
        extractedContent = getFirstNChars(fileContent, count);
      }
      if (files.length > 1) {
        return fileHeader + extractedContent;
      }
      return extractedContent;
    })
    .join(joinWith);
};



const head = function (doesExist, readFunc, { option, count, files }) {
  if (isOptionIllegal(option)) {
    return printHeadIllegalOptionUsageErrorMessage(option);
  }
  if (isCountIllegal(count)) {
    return printHeadIllegalCountError(count, option);
  }
  return extractFiles(doesExist, readFunc, { option, count, files });
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
  getFirstNChars,
  getLastNChars,
  getLastNLines,
  getFirstNLines,
  displayFileName,
  extractFiles,
  tailFiles,
  head,
  tail,
  isCountIllegal,
  isOptionIllegal,
  isIllegalOffset
};
