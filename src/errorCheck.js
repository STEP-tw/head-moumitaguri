const illegalOption = "head: illegal option -- ";
const illegalUsage = "usage: head [-n lines | -c bytes] [file ...]";

const illegalByteCount = "head: illegal byte count -- ";
const illegalLineCount = "head: illegal line count -- ";

const notFound = ": No such file or directory";

const printNotFoundError = function (file, context) {
  return context + ": " + file + notFound;
}

const isOptionIllegal = function (option) {
  return option != "n" && option != "c";
}

const isHeadCountIllegal = function (count) {
  return (count < 1 || isNaN(+count));
}

const printHeadIllegalOptionUsageErrorMessage = function (option) {
  return illegalOption + option + "\n" + illegalUsage;
}

const printHeadIllegalCountError = function (count, option) {
  if (option == "n") return illegalLineCount + count;
  return illegalByteCount + count;
}

const illegalTailOption = "tail: illegal option -- ";

const illegalTailUsage = "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";

const illegalOffset = "tail: illegal offset -- ";

const isIllegalOffset = function (count) {
  return (count < 0 || isNaN(+count));
}

const printTailIllegalOptionUsageError = function (option) {
  return illegalTailOption + option + "\n" + illegalTailUsage;
}

const printTailIllegalOffsetError = function (offset) {
  return illegalOffset + offset;
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