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

const getFile = function(path,fileContent){
  let fileDetails = { path,fileContent };
  fileDetails.fileContentInLines = extractFileContentInLines.bind(fileDetails);
  return fileDetails;
}

const extractFileContentInLines = function(){
  return this.fileContent.split('\n');
}


module.exports = { readFile, split, getFirstNChars, getFile };
