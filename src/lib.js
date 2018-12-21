const { hasError } = require("./errorCheck.js");

const { getSubstr, splitContent } = require("./util.js");

const {
  createHeading,
  printNotFoundError,
  addHeader,
  showError
} = require("./output.js");

const getNChars = function (fileContent, count, context) {
  let limit = { upper: count, lower: 0 };
  if (context == "tail") {
    limit.lower = -count;
  }
  return getSubstr(fileContent, limit);
};

const getNLines = function (fileContent, count, context) {
  let limit = { upper: count, lower: 0 };
  if (context == "tail") {
    if (+count === 0) {
      return "";
    }
    limit.lower = -count;
    limit.upper = undefined;
  }
  return splitContent(fileContent, limit);
};

const formatFileContent = function (parsedInputs, context, { existsSync, readFileSync }, file) {
  if (!existsSync(file)) {
    return printNotFoundError(file, context);
  }
  return fetchFileContents(parsedInputs, context, readFileSync, file);
};

const fetchFileContents = function (
  { option, count, files },
  context,
  readFileSync,
  file
) {
  let fileHeader = createHeading(file) + "\n";
  let content = readFileSync(file, "utf8");
  let fileContent = selectOperation(
    content,
    option,
    count,
    context
  );
  return addHeader(fileContent, fileHeader, files);
};

const selectOperation = function (
  fileContent,
  option,
  count,
  context
) {
  let action = {
    n: getNLines,
    c: getNChars
  };
  return action[option](fileContent, count, context);
};

const extractFiles = function ({ option, count, files }, context, fs) {
  let joinWith = "\n\n";
  let validateFile = formatFileContent.bind(
    null,
    { option, count, files },
    context,
    fs
  );
  return files.map(validateFile).join(joinWith);
};

const runCommand = function (parsedInputs, context, fs) {
  if (hasError(parsedInputs, context)) {
    return showError(parsedInputs, context);
  }
  return extractFiles(parsedInputs, context, fs);
};

module.exports = {
  getNChars,
  getNLines,
  selectOperation,
  extractFiles,
  runCommand
};
