const isOption = function (option) {
  return isNaN(option);
};

const isNumber = function (count) {
  return !isNaN(count);
};

const isDash = function (option) {
  return option == "-";
};

const splitContent = function (content, bounds,delimiter) {
  let { upper, lower } = bounds;
  return content.split(delimiter).slice(lower, upper).join(delimiter);
}

module.exports = {
  isOption,
  isDash,
  isNumber,
  splitContent
};
