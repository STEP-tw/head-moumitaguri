const assert = require("assert");
const {
  getNChars,
  getNLines,
  displayFileName,
  formatFileContent,
  fetchFileContents,
  selectAndPerformAction,
  extractFiles,
  // head,
  // tail,
  runCommand
} = require("../src/lib.js");


describe("displayFileName()", function () {
  it('should print ==> text  <== for input "text"', function () {
    assert.deepEqual(displayFileName("text"), "==> text <==");
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
  file = "0\n1\n2\n3";

  it("should return first line of file for the following input,context : head", function () {
    args = { option: "n", count: 1, files: [file] };
    assert.deepEqual(extractFiles(doesExist, readFunc, args, "head"), "0");
  });
  it("should return first char of file for the following input,context : head", function () {
    args = { option: "c", count: 1, files: [file] };
    assert.deepEqual(extractFiles(doesExist, readFunc, args, "head"), "0");
  });
  it("should return  first given number of chars of file ,context :head", function () {
    args = { option: "c", count: 2, files: [file] };
    assert.deepEqual(extractFiles(doesExist, readFunc, args, "head"), "0\n");
  });
  it("should return the not found error message", function () {
    file = "file does not exist";
    args = { option: "c", count: 2, files: [file] };
    assert.deepEqual(
      extractFiles(doesExist, readFunc, args, "head"),
      "head: file does not exist: No such file or directory"
    );
  });
  it("should return first given number of lines  of  multiple files", function () {
    file = "0\n1\n2\n3";
    file1 = "a\nb\nc";
    expected = "==> 0\n1\n2\n3 <==\n0\n1\n\n==> a\nb\nc <==\na\nb";
    args = { option: "n", count: 2, files: [file, file1] };
    assert.deepEqual(extractFiles(doesExist, readFunc, args, "head"), expected);
  });
  it("should return last line of file for the following input,context : tail", function () {
    args = { option: "n", count: 1, files: [file] };
    assert.deepEqual(extractFiles(doesExist, readFunc, args, "tail"), "3");
  });
  it("should return last char of file,context :tail", function () {
    args = { option: "c", count: 1, files: [file] };
    assert.deepEqual(extractFiles(doesExist, readFunc, args, "tail"), "3");
  });
  it("should return last given number of chars of file for the given input,context : tail", function () {
    args = { option: "c", count: 2, files: [file] };
    assert.deepEqual(extractFiles(doesExist, readFunc, args, "tail"), "\n3");
  });
  it("should return last given number of lines  of  multiple files,context : tail", function () {
    file = "0\n1\n2\n3";
    file1 = "a\nb\nc";
    expected = "==> 0\n1\n2\n3 <==\n2\n3\n\n==> a\nb\nc <==\nb\nc";
    args = { option: "n", count: 2, files: [file, file1] };
    assert.deepEqual(extractFiles(doesExist, readFunc, args, "tail"), expected);
  });
});

describe('getNChars()', function () {
  content = "1\n2\n3\n4\n5\n6"
  it('should return empty string for count :0,context: tail ', function () {
    assert.deepEqual(getNChars(content, 0, "tail"), "");
  });
  it('should return last given number of characters for count : 2,context :tail', function () {

    assert.deepEqual(getNChars(content, 2, "tail"), "\n6");
  });
  it('should return the whole string when count > string length and context : tail', function () {
    assert.deepEqual(getNChars(content, 12, "tail"), content);
  });

  it('should return first given number(2) of characters for count : 2,context :head', function () {

    assert.deepEqual(getNChars(content, 2, "head"), "1\n");
  });
  it('should return the whole string when count > string length and context : head', function () {
    assert.deepEqual(getNChars(content, 12, "head"), content);
  });
});

describe('getNLines()', function () {
  content = "1\n2\n3\n4\n5\n6";
  it('should return empty string for count :0,context: tail ', function () {
    assert.deepEqual(getNLines(content, 0, "tail"), "");
  });
  it('should return last line when count : 1,context : tail', function () {
    assert.deepEqual(getNLines(content, 1, "tail"), "6");
  });
  it('should return last given number(4) of lines when count : 4, context : tail', function () {
    assert.deepEqual(getNLines(content, 4, "tail"), "3\n4\n5\n6");
  });
  it('should return whole string when count > string length, context :tail', function () {
    assert.deepEqual(getNLines(content, 12, "tail"), content);
  });
  it('should return first line when count : 1,context : head', function () {
    assert.deepEqual(getNLines(content, 1, "head"), "1");
  });
  it('should return first given number(4) of lines when count : 4, context : tail', function () {
    assert.deepEqual(getNLines(content, 4, "head"), "1\n2\n3\n4");
  });
  it('should return whole string when count > string length, context :head', function () {
    assert.deepEqual(getNLines(content, 12, "head"), content);
  });
});

describe('runCommand() for tail', function () {
  let file = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9";
  let file2 = "0\n1\n2\n3";
  let file3 = "a\nb\nc";
  let context = "tail";

  it('should handle default argument case for single file : node ./tail.js file', function () {
    args = { option: "n", count: 10, files: [file] };
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), file);
  });
  it('should handle default argument case for multiple files : node ./tail.js file file1', function () {
    args = { option: "n", count: 10, files: [file, file2] };
    expected = "==> " + file + " <==\n" + file + "\n\n==> " + file2 + " <==\n" + file2;
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
  it('should return last line for input node ./tail.js -n1 file', function () {
    args = { option: "n", count: 1, files: [file] };
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), '9');
  });

  it('should return last character for node ./tail.js -c1 file', function () {
    args = { option: "c", count: 1, files: [file] };
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), '9');
  });

  it('should return last given number of lines for node ./tail.js -n4 file', function () {
    args = { option: "n", count: 4, files: [file] };
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), '6\n7\n8\n9');
  });

  it('should return last given number of characters for node ./tail.js -c4 file', function () {
    args = { option: "c", count: 4, files: [file] };
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), '\n8\n9');
  });

  it('should return last given number of lines for multiple files node ./tail.js -n2 file2 file3', function () {
    args = { option: "n", count: 2, files: [file2, file3] };
    expected = "==> 0\n1\n2\n3 <==\n2\n3\n\n==> a\nb\nc <==\nb\nc";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });

  it('should return last given number of characters for multiple files node ./tail.js -n2 file2 file3', function () {
    args = { option: "c", count: 2, files: [file2, file3] };
    expected = "==> 0\n1\n2\n3 <==\n\n3\n\n==> a\nb\nc <==\n\nc";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
  it('should return tail: illegal offset -- c for node ./tail.js -cc file ', function () {
    args = { option: "c", count: "c", files: [file] };
    expected = "tail: illegal offset -- c";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
  it('should return tail: illegal option -- v\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...] for node ./head.js -v3 file ', function () {
    args = { option: "v", count: 3, files: [file] };
    expected = "tail: illegal option -- v\nusage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
});

describe('runCommand() for head', function () {
  let file = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9";
  let file2 = "0\n1\n2\n3";
  let file3 = "a\nb\nc";
  let context = "head";
  it('should handle default argument case for single file : node ./head.js file', function () {
    args = { option: "n", count: 10, files: [file] };
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), file);
  });
  it('should handle default argument case for multiple files : node ./head.js file file1', function () {
    args = { option: "n", count: 10, files: [file, file2] };
    expected = "==> " + file + " <==\n" + file + "\n\n==> " + file2 + " <==\n" + file2;
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
  it('should return first line for input node ./head.js -n1 file', function () {
    args = { option: "n", count: 1, files: [file] };
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), '0');
  });

  it('should return first character for node ./head.js -c1 file', function () {
    args = { option: "c", count: 1, files: [file] };
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), '0');
  });

  it('should return first given number of lines for node ./head.js -n4 file', function () {
    args = { option: "n", count: 4, files: [file] };
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), '0\n1\n2\n3');
  });

  it('should return first given number of characters for node ./head.js -c4 file', function () {
    args = { option: "c", count: 4, files: [file] };
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), '0\n1\n');
  });

  it('should return first given number of lines for multiple files node ./head.js -n2 file2 file3', function () {
    args = { option: "n", count: 2, files: [file2, file3] };
    expected = "==> 0\n1\n2\n3 <==\n0\n1\n\n==> a\nb\nc <==\na\nb";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });

  it('should return first given number of characters for multiple files node ./tail.js -n2 file2 file3', function () {
    args = { option: "c", count: 2, files: [file2, file3] };
    expected = "==> 0\n1\n2\n3 <==\n0\n\n\n==> a\nb\nc <==\na\n";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
  it('should return head: illegal byte count -- 0 for node ./head.js -c0 file ', function () {
    args = { option: "c", count: 0, files: [file] };
    expected = "head: illegal byte count -- 0";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
  it('should return head: illegal line count -- 0 for node ./head.js -n0 file ', function () {
    args = { option: "n", count: 0, files: [file] };
    expected = "head: illegal line count -- 0";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
  it('should return head: illegal byte count -- c for node ./head.js -cc file ', function () {
    args = { option: "c", count: "c", files: [file] };
    expected = "head: illegal byte count -- c";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
  it('should return head: illegal line count -- 0 for node ./head.js -nc file ', function () {
    args = { option: "n", count: "c", files: [file] };
    expected = "head: illegal line count -- c";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
  it('should return head: illegal option -- v\nusage: head [-n lines | -c bytes] [file ...] for node ./head.js -v3 file ', function () {
    args = { option: "v", count: 3, files: [file] };
    expected = "head: illegal option -- v\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(runCommand(doesExist, readFunc, args, context), expected);
  });
});