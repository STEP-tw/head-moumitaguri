const isOption = function(option) {
  return isNaN(option);
};

const isNumber = function(count) {
  return !isNaN(count);
};

const isDash = function(option) {
  return option == "-";
};

const splitContent = function(content,bounds) {
  let { upper, lower } = bounds;
  return content.split("\n").slice(lower,upper).join("\n");
}

const getSubstr = function(content,bounds) {
 let { upper, lower } = bounds;
 return content.substr(lower,upper);
}


module.exports = {
  isOption,
  isDash,
  isNumber,
  splitContent,
  getSubstr
};
