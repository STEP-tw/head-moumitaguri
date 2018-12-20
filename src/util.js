const isOption = function(option) {
  return isNaN(option);
};

const isNumber = function(count) {
  return !isNaN(count);
};

const isDash = function(option) {
  return option == "-";
};

const splitContent = function(string,bounds) {
  let { upper, lower } = bounds;
  return string.split("\n").slice(lower,upper).join("\n");
}

const getSubstr = function(string,bounds) {
 let { upper, lower } = bounds;
 return string.substr(lower,upper);
}


module.exports = {
  isOption,
  isDash,
  isNumber,
  splitContent,
  getSubstr
};
