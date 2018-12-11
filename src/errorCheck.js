const illegalOption = "head: illegal option -- ";
const illegalUsage = "usage: head [-n lines | -c bytes] [file ...]";

const illegalByteCount = "head: illegal byte count -- ";
const illegalLineCount = "head: illegal line count -- ";


const isOptionIllegal = function (option) {
  return option != "n" && option != "c";
}

const isCountIllegal = function (count) {
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
  return (offset < 0 || isNaN(offset - 0));
}

const printTailIllegalOptionUsageError = function (option) {
  return illegalTailOption + option + "\n" + illegalTailUsage;
}

const printTailIllegalOffsetError = function (offset) {
  return illegalOffset + offset;
}

module.exports = {
  isOptionIllegal,
  isCountIllegal,
  isIllegalOffset,
  printHeadIllegalCountError,
  printHeadIllegalOptionUsageErrorMessage,
  printTailIllegalOffsetError,
  printTailIllegalOptionUsageError
};