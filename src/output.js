const HEAD_OPTION = "head: illegal option -- ";
const HEAD_USAGE = "usage: head [-n lines | -c bytes] [file ...]";

const HEAD_BYTE_COUNT = "head: illegal byte count -- ";
const HEAD_LINE_COUNT = "head: illegal line count -- ";

const TAIL_OPTION = "tail: illegal option -- ";
const TAIL_USAGE =
  "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
const TAIL_COUNT = "tail: illegal offset -- ";

const FILE_NOT_FOUND = ": No such file or directory";

const printNotFoundError = function (file, context) {
  return context + ": " + file + FILE_NOT_FOUND;
};

const { isOptionIllegal, isIllegalCount } = require("./errorCheck.js");

const createHeading = function (fileName) {
  return "==> " + fileName + " <==";
};

const addHeader = function (fileContent, fileHeader, files) {
  if (files.length > 1) {
    return fileHeader + fileContent;
  }
  return fileContent;
};

const showError = function ({ option, count }, context) {
  if (isOptionIllegal(option)) {
    return showOptionUsageError(option, context);
  }
  if (isIllegalCount(count, context)) {
    return countError[context](count, option);
  }
};

const showOptionUsageError = function (option, context) {
  let error = {
    head: HEAD_OPTION + option + "\n" + HEAD_USAGE,
    tail: TAIL_OPTION + option + "\n" + TAIL_USAGE
  }
  return error[context];
}

const printHeadIllegalCountError = function (count, option) {
  if (option == "n") return HEAD_LINE_COUNT + count;
  return HEAD_BYTE_COUNT + count;
};

const printTailIllegalOffsetError = function (offset) {
  return TAIL_COUNT + offset;
};

const countError = {
  head: printHeadIllegalCountError,
  tail: printTailIllegalOffsetError
};

module.exports = {
  createHeading,
  addHeader,
  showError,
  printNotFoundError
};
