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

const illegalOption = "head: illegal option -- ";
const illegalUsage = "usage: head [-n lines | -c bytes] [file ...]";

const illegalByteCount = "head: illegal byte count -- ";
const illegalLineCount = "head: illegal line count -- ";


const isOptionIllegal = function(option){
  return option != "n" && option != "c";
}

const isCountIllegal = function(count){
  return (count < 1 || isNaN(count - 0));
}

const head = function(doesExist, readFunc, { option, count, files }) {
  if (isOptionIllegal(option)) {
    return illegalOption + option + "\n" + illegalUsage;
  }
  if(isCountIllegal(count)){
    if (option == "n") return illegalLineCount + count;
    return illegalByteCount + count;
  }

  return extractFiles(doesExist, readFunc, { option, count, files });
};

module.exports = {
  getFirstNChars,
  getFirstNLines,
  displayFileName,
  extractFiles,
  head
};
