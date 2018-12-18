const readFileSync = function(expectedFile, expectedEncoding, expectedContent) {
  return function(actualFile, actualEncoding) {
    const isValidFile = function() {
      return actualFile == expectedFile;
    };
    const isValidEncoding = function() {
      return actualEncoding == expectedEncoding;
    };
    const areValidArgs = function() {
      return isValidFile && isValidEncoding;
    };
    if (areValidArgs) {
      return expectedContent;
    }
  };
};

const existsSync = function(fileName) {
  return fileName != "fileDoesNotExist";
};

module.exports = { readFileSync, existsSync };
