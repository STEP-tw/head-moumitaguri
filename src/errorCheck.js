const FILE_NOT_FOUND = ": No such file or directory";

const printNotFoundError = function (file, context) {
  return context + ": " + file + FILE_NOT_FOUND;
}


const hasError = function (parsedInput, context) {
  return (isOptionIllegal(parsedInput.option)
    || isIllegalCount(parsedInput.count, context));
}

const isOptionIllegal = function (option) {
  return option != "n" && option != "c";
}

const isIllegalCount = function (count, context) {
  return illegalCount[context](count);
}

const isHeadCountIllegal = function (count) {
  return (count < 1 || isNaN(+count));
}

const isIllegalOffset = function (count) {
  return (count < 0 || isNaN(+count));
}

const illegalCount = {
  head: isHeadCountIllegal,
  tail: isIllegalOffset
}

module.exports = {
  isOptionIllegal,
  isHeadCountIllegal,
  isIllegalOffset,
  isIllegalCount,
  printNotFoundError,
  hasError
};