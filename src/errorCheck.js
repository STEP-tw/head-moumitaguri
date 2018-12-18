const illegalOption = "head: illegal option -- ";
const illegalUsage = "usage: head [-n lines | -c bytes] [file ...]";

const illegalByteCount = "head: illegal byte count -- ";
const illegalLineCount = "head: illegal line count -- ";

const notFound = ": No such file or directory";

const printNotFoundError = function(file,context) {
  return context + ": " + file + notFound;
}

const isOptionIllegal = function (option) {
  return option != "n" && option != "c";
}

const isHeadCountIllegal = function (count) {
  return (count < 1 || isNaN(count - 0));
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

const isIllegalOffset = function (offset) {
  return isNaN(offset - 0);
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

const hasIllegalInputs = function (parsedInput) {
  return (isOptionIllegal(parsedInput.option)
    || isHeadCountIllegal(parsedInput.count)
    || isIllegalOffset(parsedInput.count))
}

const displayFileName = function (fileName) {
  return "==> " + fileName + " <==";
};


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
  displayFileName
};