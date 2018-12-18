const isOption = function(option) {
  return isNaN(option);
};

const isNumber = function(count) {
  return !isNaN(count);
};

const isDash = function(option) {
  return option == "-";
};

module.exports = {
  isOption,
  isDash,
  isNumber
};
