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

const getSubstr = function (content, bounds) {
  let { upper, lower } = bounds;
  return content.substr(lower, upper);
}


module.exports = {
  isOption,
  isDash,
  isNumber,
  splitContent,
  getSubstr
};
