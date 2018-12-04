const readFile = function(func,path,type){
  return func(path,type);
}

const split = function(string){
  return function(separator){
    return string.split(separator);
  }
}

module.exports = { readFile, split };
