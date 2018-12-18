const HEAD_OPTION = "head: illegal option -- ";
const HEAD_USAGE = "usage: head [-n lines | -c bytes] [file ...]";

const HEAD_BYTE_COUNT = "head: illegal byte count -- ";
const HEAD_LINE_COUNT = "head: illegal line count -- ";

const TAIL_OPTION = "tail: illegal option -- ";
const TAIL_USAGE = "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
const TAIL_COUNT = "tail: illegal offset -- ";


const { isOptionIllegal,
  isIllegalCount
} = require('./errorCheck.js');

const displayFileName = function (fileName) {
  return "==> " + fileName + " <==";
};

const addHeader = function (fileContent, fileHeader, files) {
  if (files.length > 1) {
    return fileHeader + fileContent;
  }
  return fileContent;
}

const showError = function (parsedInput, context) {
  if (isOptionIllegal(parsedInput.option)) {
    return optionAndUsageError[context](parsedInput.option)
  }
  if (isIllegalCount(parsedInput.count, context)) {
    return countError[context](parsedInput.count, parsedInput.option);
  }
}

const printHeadIllegalOptionUsageErrorMessage = function (option) {
  return HEAD_OPTION + option + "\n" + HEAD_USAGE;
}

const printTailIllegalOptionUsageError = function (option) {
  return TAIL_OPTION + option + "\n" + TAIL_USAGE;
}

const optionAndUsageError = {
  head: printHeadIllegalOptionUsageErrorMessage,
  tail: printTailIllegalOptionUsageError
};

const printHeadIllegalCountError = function (count, option) {
  if (option == "n") return HEAD_LINE_COUNT + count;
  return HEAD_BYTE_COUNT + count;
}

const printTailIllegalOffsetError = function (offset) {
  return TAIL_COUNT + offset;
}

const countError = {
  head: printHeadIllegalCountError,
  tail: printTailIllegalOffsetError
};

module.exports = {
  displayFileName,
  addHeader,
  showError
};