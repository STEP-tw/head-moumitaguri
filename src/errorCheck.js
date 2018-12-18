const HEAD_OPTION = "head: illegal option -- ";
const HEAD_USAGE = "usage: head [-n lines | -c bytes] [file ...]";

const HEAD_BYTE_COUNT = "head: illegal byte count -- ";
const HEAD_LINE_COUNT = "head: illegal line count -- ";

const TAIL_OPTION = "tail: illegal option -- ";
const TAIL_USAGE = "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
const TAIL_COUNT = "tail: illegal offset -- ";


const FILE_NOT_FOUND = ": No such file or directory";

const printNotFoundError = function (file, context) {
  return context + ": " + file + FILE_NOT_FOUND;
}

const isOptionIllegal = function (option) {
  return option != "n" && option != "c";
}

const isHeadCountIllegal = function (count) {
  return (count < 1 || isNaN(+count));
}

const printHeadIllegalOptionUsageErrorMessage = function (option) {
  return HEAD_OPTION + option + "\n" + HEAD_USAGE;
}

const printHeadIllegalCountError = function (count, option) {
  if (option == "n") return HEAD_LINE_COUNT + count;
  return HEAD_BYTE_COUNT + count;
}


const isIllegalOffset = function (count) {
  return (count < 0 || isNaN(+count));
}

const printTailIllegalOptionUsageError = function (option) {
  return TAIL_OPTION + option + "\n" + TAIL_USAGE;
}

const printTailIllegalOffsetError = function (offset) {
  return TAIL_COUNT + offset;
}
const optionAndUsageError = {
  head: printHeadIllegalOptionUsageErrorMessage,
  tail: printTailIllegalOptionUsageError
};

const illegalCount = {
  head: isHeadCountIllegal,
  tail: isIllegalOffset
}

const isIllegalCount = function (count, context) {
  return illegalCount[context](count);
}

const countError = {
  head: printHeadIllegalCountError,
  tail: printTailIllegalOffsetError
};

const showError = function (parsedInput, context) {
  if (isOptionIllegal(parsedInput.option)) {
    return optionAndUsageError[context](parsedInput.option)
  }
  if (isIllegalCount(parsedInput.count, context)) {
    return countError[context](parsedInput.count, parsedInput.option);
  }
}

const hasIllegalInputs = function (parsedInput, context) {
  return (isOptionIllegal(parsedInput.option)
    || isIllegalCount(parsedInput.count, context));
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

module.exports = {
  isOptionIllegal,
  isHeadCountIllegal,
  isIllegalOffset,
  printNotFoundError,
  printHeadIllegalCountError,
  printHeadIllegalOptionUsageErrorMessage,
  printTailIllegalOffsetError,
  printTailIllegalOptionUsageError,
  hasIllegalInputs,
  showError,
  displayFileName,
  addHeader
};