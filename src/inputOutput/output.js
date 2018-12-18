const displayFileName = function (fileName) {
    return "==> " + fileName + " <==";
  };

  const addHeader = function (fileContent, fileHeader, files) {
    if (files.length > 1) {
      return fileHeader + fileContent;
    }
    return fileContent;
  }

  module.exports = { displayFileName, addHeader };