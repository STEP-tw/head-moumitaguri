const getFirstNChars = function(fileContent, numberOfChars) {
  return fileContent.slice(0, numberOfChars);
};

const getFirstNLines = function(fileContent, numberOfLines = 10) {
  return fileContent
    .split("\n")
    .slice(0, numberOfLines)
    .join("\n");
};

const displayFileName = function(fileName) {
  return "==> " + fileName + " <==";
};

const notFound = ": No such file or directory";
const extractFiles = function(
  doesExist,
  readFunc,
  { option, optionValue, files }
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
        extractedContent = getFirstNLines(fileContent, optionValue);
      }
      if (option == "c") {
        extractedContent = getFirstNChars(fileContent, optionValue);
      }
      if (files.length > 1) {
        return fileHeader + extractedContent;
      }
      return extractedContent;
    })
    .join(joinWith);
};

const illegalOption = "head: illegal option -- ";
const illegalUsage = "usage: head [-n lines | -c bytes] [file ...]";

const illegalByteCount = "head: illegal byte count -- ";
const illegalLineCount = "head: illegal line count -- ";

const head = function(doesExist, readFunc, { option, optionValue, files }) {
  if (option != "n" && option != "c") {
    return illegalOption + option + "\n" + illegalUsage;
  }
  if (optionValue < 1 || isNaN(optionValue - 0)) {
    if (option == "n") return illegalLineCount + optionValue;
    return illegalByteCount + optionValue;
  }

  return extractFiles(doesExist, readFunc, { option, optionValue, files });
};

module.exports = {
  getFirstNChars,
  getFirstNLines,
  displayFileName,
  extractFiles,
  head
};
