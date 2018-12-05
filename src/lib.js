const readFile = function(reader,path,encodingType){
  return reader(path,encodingType);
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


const displayFileName = function(fileName){
  return '==> '+fileName+' <==';
}


module.exports = { readFile, getFirstNChars, getFile, getFirstNLines, displayFileName };
