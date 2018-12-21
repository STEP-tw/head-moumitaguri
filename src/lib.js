const { hasError } = require("./errorCheck.js");

const { splitContent } = require("./util.js");

const {
  createHeading,
  printNotFoundError,
  addHeader,
  showError
} = require("./output.js");

const getBounds = function (count, headOrTail) {
  const bounds = {
    head: { upper: count, lower: 0 },
    tail: { upper: undefined, lower: -count }
  };
  return bounds[headOrTail];
}

const getNChars = function (fileContent, count, context) {
  const bounds = getBounds(count,context);
  return splitContent(fileContent, bounds, "");
};

const getNLines = function (fileContent, count, context ) {
  if (context == "tail") {
    if (+count === 0) {
      return "";
    }
  }
  const bounds = getBounds(count, context);
  return splitContent(fileContent, bounds, "\n");
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
  getBounds,
  getNChars,
  getNLines,
  selectOperation,
  extractFiles,
  runCommand
};
