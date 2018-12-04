const readFile = function(func,path,type){
  return func(path,type);
}

const split = function(string){
  return function(separator){
    return string.split(separator);
  }
}

const getFirstNChars = function(string,numberOfChars){
  return string.slice(0,numberOfChars);
}

module.exports = { readFile, split, getFirstNChars };
