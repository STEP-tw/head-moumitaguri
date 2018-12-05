const readFile = function(reader,path,encodingType){
  return reader(path,encodingType);
}

const split = function(string){
  return function(separator){
    return string.split(separator);
  }
}

const getFirstNChars = function(fileDetails,numberOfChars){
  let fileContent = fileDetails.fileContent;
  return fileContent.slice(0,numberOfChars);
}

const getFirstNLines = function(fileDetails,numberOfLines = 10){
  let fileContent = fileDetails.fileContentInLines()
  return fileContent.slice(0,numberOfLines).join('\n');
}

const getFile = function(path,fileContent){
  let fileDetails = { path,fileContent };
  fileDetails.fileContentInLines = extractFileContentInLines.bind(fileDetails);
  return fileDetails;
}

const extractFileContentInLines = function(){
  return this.fileContent.split('\n');
}

const extractOptions = function(args){
  let options = args.filter((arg) => arg.startsWith('-n')||arg.startsWith('-c')||arg == '-' || (arg.charCodeAt(arg.length-1) >=48 && arg.charCodeAt(arg.length-1) <= 57));
  if(options == 0){
    return false;
  }
  return options;
}

module.exports = { readFile, split, getFirstNChars, getFile, getFirstNLines, extractOptions };
