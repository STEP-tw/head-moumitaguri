const { equal, deepEqual } = require("assert");
const {
  getFirstNChars,
  getFirstNLines,
  getLastNChars,
  getLastNLines,
  displayFileName,
  extractFiles,
  tail
} = require("../src/lib.js");

describe("getFirstNChars()", function () {
  it("should return empty string when input is empty string and numberOfChars = 0", function () {
    deepEqual(getFirstNChars("file", 0), "");
  });
  it("should return string of n characters when numberOfChars = n", function () {
    deepEqual(getFirstNChars("file", 1), "f");
  });
  it("should return string of n characters when input string has n chars and numberOfChars > n", function () {
    deepEqual(getFirstNChars("file", 5), "file");
  });
});

describe("getFirstNLines", function () {
  fileContent = "get a file\nsave it\nedit it\nagain save it";
  it("should return one line for input 1 ", function () {
    deepEqual(getFirstNLines(fileContent, 1), "get a file");
  });
  it("should return n lines  of the given file when n is given ", function () {
    deepEqual(getFirstNLines(fileContent, 3), "get a file\nsave it\nedit it");
  });
  it("should return all  lines of the given file when numberOfLines is not provided as it is default as 10 ", function () {
    deepEqual(
      getFirstNLines(fileContent),
      "get a file\nsave it\nedit it\nagain save it"
    );
  });
});

describe("displayFileName()", function () {
  it('should print ==> text  <== for input "text"', function () {
    deepEqual(displayFileName("text"), "==> text <==");
  });
});

readFunc = function (file) {
  return file;
};

doesExist = function (file) {
  if (file == "file does not exist") {
    return false;
  }
  return true;
};

describe("extractFiles()", function () {
  file = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9";
  it("should return  given number of lines of file", function () {
    args = { option: "n", count: 1, files: [file] };
    deepEqual(extractFiles(doesExist, readFunc, args), "0");
  });
  it("should return  given number of chars of file", function () {
    args = { option: "c", count: 1, files: [file] };
    deepEqual(extractFiles(doesExist, readFunc, args), "0");
  });
  it("should return  given number of chars of file", function () {
    args = { option: "c", count: 2, files: [file] };
    deepEqual(extractFiles(doesExist, readFunc, args), "0\n");
  });
  it("should return the not found error message", function () {
    file = "file does not exist";
    args = { option: "c", count: 2, files: [file] };
    deepEqual(
      extractFiles(doesExist, readFunc, args),
      "head: file does not exist: No such file or directory"
    );
  });
  it("should return  given number of lines  of  multiple files", function () {
    file = "0\n1\n2\n3";
    file1 = "a\nb\nc";
    expected = "==> 0\n1\n2\n3 <==\n0\n1\n\n==> a\nb\nc <==\na\nb";
    args = { option: "n", count: 2, files: [file, file1] };
    deepEqual(extractFiles(doesExist, readFunc, args), expected);
  });
});

describe('getLastNChars()', function () {
  content = "1\n2\n3\n4\n5\n6"
  it('should return empty string when input is 0', function () {
    deepEqual(getLastNChars(content, 0), "");
  });
  it('should return last n characters of a string when input is n', function () {

    deepEqual(getLastNChars(content, 2), "\n6");
  });
  it('should return the whole string when input n > string length', function () {
    deepEqual(getLastNChars(content, 12), content);
  });
});

describe('getLastNLines()', function () {
  content = "1\n2\n3\n4\n5\n6";
  it('should return last line of the given string when input is 1', function () {
    deepEqual(getLastNLines(content, 1), "6");
  });
  it('should return last n lines of the given string when input is n', function () {
    deepEqual(getLastNLines(content, 4), "3\n4\n5\n6");
  });
  it('should return whole string when input n > string length', function () {
    deepEqual(getLastNLines(content, 12), content);
  });
});

describe('tail()', function () {
  let file = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9";
  let file2 = "0\n1\n2\n3";
  let file3 = "a\nb\nc";
  it('should return last line for input node ./tail.js -n1 file', function () {
    args = { option: "n", offset: 1, files: [file] };
    deepEqual(tail(doesExist, readFunc, args), '9');
  });

  it('should return last character for node ./tail.js -c1 file', function () {
    args = { option: "c", offset: 1, files: [file] };
    deepEqual(tail(doesExist, readFunc, args), '9');
  });
  
  it('should return last given number of lines for node ./tail.js -n4 file', function () {
    args = { option: "n", offset: 4, files: [file] };
    deepEqual(tail(doesExist, readFunc, args), '6\n7\n8\n9');
  });

  it('should return last given number of characters for node ./tail.js -c4 file', function () {
    args = { option: "c", offset: 4, files: [file] };
    deepEqual(tail(doesExist, readFunc, args), '\n8\n9');
  });

  it('should return last given number of lines for multiple files node ./tail.js -n2 file2 file3', function () {
    args = { option: "n", offset: 2, files: [file2, file3] };
    expected = "==> 0\n1\n2\n3 <==\n2\n3\n\n==> a\nb\nc <==\nb\nc";
    deepEqual(tail(doesExist, readFunc, args), expected);
  });

  it('should return last given number of characters for multiple files node ./tail.js -n2 file2 file3', function () {
    args = { option: "c", offset: 2, files: [file2, file3] };
    expected = "==> 0\n1\n2\n3 <==\n\n3\n\n==> a\nb\nc <==\n\nc";
    deepEqual(tail(doesExist, readFunc, args), expected);
  });
});