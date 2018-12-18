
const assert = require("assert");
const {
  getNChars,
  getNLines,
  extractFiles,
  runCommand
} = require("../src/lib.js");

describe('getNChars', function () {
  let content = "1\n2\n3\n4\n5\n6"
  it('should return empty string for count 0', function () {
    let actualOut = getNChars(content, 0);
    assert.deepEqual(actualOut, "");
  });
  it('should return guven number of characters when count is specified', function () {
    let actualOut = getNChars(content, 2);
    let expectedOut = "1\n";
    assert.deepEqual(actualOut, expectedOut);
  });
  it('should return the whole file when count > number of characters in file', function () {
    let actualOut = getNChars(content, 12);
    let expectedOut = "1\n2\n3\n4\n5\n6";
    assert.deepEqual(actualOut, expectedOut);
  });

  it('should return last given number of characters when count is specified', function () {
    let actualOut = getNChars(content, 4, "tail");
    let expectedOut = "\n5\n6";
    assert.deepEqual(actualOut, expectedOut);
  });
});

describe('getNLines', function () {
  let content = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";

  it ('should return by default 10 lines when count is not specified' , function() {
    let actualOut = getNLines(content);
    let expectedOut = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    assert.equal(actualOut,expectedOut);
  });
  it('should return empty string for count 0', function () {
    let actualOut = getNLines(content, 0);
    let expectedOut = "";
    assert.deepEqual(actualOut, expectedOut);
  });

  it('should return  given number of lines when count is specified', function () {
    let actualOut = getNLines(content, 4);
    let expectedOut = "1\n2\n3\n4";
    assert.deepEqual(actualOut, expectedOut);
  });
  it('should return whole file when count > number of lines in file', function () {
    let actualOut = getNLines(content, 12);
    let expectedOut = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
    assert.deepEqual(actualOut, expectedOut);
  });
  
  it('should return last given number of lines when count is specified', function () {
    let actualOut = getNLines(content, 4, "tail");
    let expectedOut = "7\n8\n9\n10";
    assert.deepEqual(actualOut, expectedOut);
  });
});




const readFileSync = function (expectedFile, expectedEncoding, expectedContent) {
  return function (actualFile, actualEncoding) {
    const isValidFile = function () {
      return actualFile == expectedFile;
    }
    const isValidEncoding = function () {
      return actualEncoding == expectedEncoding;
    }
    const areValidArgs = function () {
      return isValidFile && isValidEncoding;
    }
    if (areValidArgs) {
      return expectedContent;
    }
  }
}

const existsSync = function (fileName) {
  return fileName != "fileDoesNotExist";
}

describe("extractFiles", function () {
  let file1 = "numbers.txt";
  let file2 = "vowels.txt";

  let expectedFile1Content = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9";
  let expectedFile2Content = "a\ne\ni\no\nu";

  let readNumbers = readFileSync("numbers.txt", "utf8", expectedFile1Content);
  let readVowels = readFileSync("vowels.txt", "utf8", expectedFile2Content);

  describe('for context : head', function () {
    describe('for single file', function () {
      let mockFs = { existsSync: existsSync, readFileSync: readNumbers };

      it("should return first line of file for the following input", function () {
        let args = { option: "n", count: 1, files: ["numbers.txt"] };
        let actualOut = extractFiles(args, "head", mockFs);
        let expectedOut = "0";
        assert.deepEqual(actualOut, expectedOut);

      });

      it("should return first char of file for the following input", function () {
        let args = { option: "c", count: 1, files: ["numbers.txt"] };
        let actualOut = extractFiles(args, "head", mockFs);
        let expectedOut = "0";
        assert.deepEqual(actualOut, expectedOut);
      });

      it("should return  first given number of chars of file", function () {
        let args = { option: "c", count: 2, files: ["numbers.txt"] };
        let actualOut = extractFiles(args, "head", mockFs);
        let expectedOut = "0\n";
        assert.deepEqual(actualOut, expectedOut);
      });
    });

    describe('for multiple files', function () {
      let mockFs = { readFileSync: readVowels, existsSync: existsSync };
      it("should return first given number of lines", function () {
        let args = { option: "n", count: 2, files: ["vowels.txt", "vowels.txt"] };
        let actualOut = extractFiles(args, "head", mockFs);
        let expectedOut = "==> vowels.txt <==\na\ne\n\n==> vowels.txt <==\na\ne";
        assert.deepEqual(actualOut, expectedOut);
      });
    });

  });

  describe('for context : tail', function () {
    describe('for single file', function () {
      let mockFs = { readFileSync: readVowels, existsSync: existsSync };

      it("should return last line of file for the following input", function () {
        let args = { option: "n", count: 1, files: ["vowels.txt"] };
        let actualOut = extractFiles(args, "tail", mockFs);
        let expectedOut = "u";
        assert.deepEqual(actualOut, expectedOut);
      });

      it("should return last char of file", function () {
        let args = { option: "c", count: 1, files: ["vowels.txt"] };
        let actualOut = extractFiles(args, "tail", mockFs);
        let expectedOut = "u";
        assert.deepEqual(actualOut, expectedOut);
      });

      it("should return last given number of chars of file for the given input", function () {
        let args = { option: "c", count: 2, files: ["vowels.txt"] };
        let actualOut = extractFiles(args, "tail", mockFs);
        let expectedOut = "\nu";
        assert.deepEqual(actualOut, expectedOut);
      });
    });

    describe('for multiple files', function () {
      let mockFs = { readFileSync: readVowels, existsSync: existsSync };
      it("should return last given number of lines  of  multiple files", function () {
        let args = { option: "n", count: 2, files: ["vowels.txt", "vowels.txt"] };
        let actualOut = extractFiles(args, "tail", mockFs);
        let expectedOut = "==> vowels.txt <==\no\nu\n\n==> vowels.txt <==\no\nu";
        assert.deepEqual(actualOut, expectedOut);
      });
    });
  });

  describe('for file not found error ', function () {
    it("should return the not found error message", function () {
      let fileName = "fileDoesNotExist";
      let expected = "head: fileDoesNotExist: No such file or directory";
      let readNotFoundFile = readFileSync(fileName, "utf8", expected);
      let mockFs = { readFileSync: readNotFoundFile, existsSync: existsSync };
      let args = { option: "c", count: 2, files: ["fileDoesNotExist"] };
      let actualOut = extractFiles(args, "head", mockFs);
      assert.deepEqual(actualOut, expected);
    });
  });

});



describe('runCommand', function () {
  describe('for tail', function () {

    let file1 = "numbers.txt";
    let file2 = "vowels.txt";
    let file3 = "fifTeenLines.txt";
    let expectedFile1Content = "9\n8\n7\n6\n5\n4\n3\n2\n1\n0";//10 lines => default number of line =10
    let expectedFile2Content = "a\ne\ni\no\nu";                //less than 10 lines
    let expectedFile3Content = "14\n13\n12\n11\n10\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0"; // more than 10 lines

    let readNumbers = readFileSync(file1, "utf8", expectedFile1Content);
    let readVowels = readFileSync(file2, "utf8", expectedFile2Content);
    let read15Numbers = readFileSync(file1, "utf8", expectedFile3Content);

    let context = "tail";

    describe("should handle default argument case", function () {
      let mockFs = { readFileSync: read15Numbers, existsSync: existsSync };
      let args = { option: "n", count: 10, files: ["fifTeenLines.txt"] };

      it('for single file : node ./tail.js fifTeenLines.txt', function () {
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "9\n8\n7\n6\n5\n4\n3\n2\n1\n0";
        assert.deepEqual(actualOut, expectedOut);
      });

      it('for multiple files : node ./tail.js fifTeenLines.txt fifTeenLines.txt', function () {
        let args = { option: "n", count: 10, files: ["fifTeenLines.txt", "fifTeenLines.txt"] };
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "==> fifTeenLines.txt <==\n";
        expectedOut += "9\n8\n7\n6\n5\n4\n3\n2\n1\n0\n\n";
        expectedOut += "==> fifTeenLines.txt <==\n";
        expectedOut += "9\n8\n7\n6\n5\n4\n3\n2\n1\n0";
        assert.deepEqual(actualOut, expectedOut);
      });

    });

    describe("for file that has fewer than default number of lines", function () {
      let mockFs = { readFileSync: readVowels, existsSync: existsSync };

      it("for single file node ./tail.js vowels.txt", function () {
        let args = { option: "n", count: 10, files: ["vowels.txt"] };

        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "a\ne\ni\no\nu";
        assert.deepEqual(actualOut, expectedOut);
      });

      it('for multiple files node ./tail.js vowels.txt vowels.txt', function () {
        let args = { option: "n", count: 10, files: ["vowels.txt", "vowels.txt"] };
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "==> vowels.txt <==\n";
        expectedOut += "a\ne\ni\no\nu\n\n";
        expectedOut += "==> vowels.txt <==\n";
        expectedOut += "a\ne\ni\no\nu";
        assert.deepEqual(actualOut, expectedOut);
      });

    });

    describe('should only list as many lines as specified', function () {
      let mockFs = { readFileSync: readNumbers, existsSync: existsSync };
      describe("should return last 5 lines ", function () {

        it("for single file node ./tail.js -n5 numbers.txt", function () {
          let args = { option: "n", count: 5, files: ["numbers.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "4\n3\n2\n1\n0";
          assert.deepEqual(actualOut, expectedOut);
        });

        it("for multiple files node ./tail.js numbers.txt numbers.txt", function () {
          let args = { option: "n", count: 5, files: ["numbers.txt", "numbers.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "==> numbers.txt <==\n";
          expectedOut += "4\n3\n2\n1\n0\n\n";
          expectedOut += "==> numbers.txt <==\n";
          expectedOut += "4\n3\n2\n1\n0";
          assert.deepEqual(actualOut, expectedOut);
        });

      });

    });

    describe('should list the contents of the entire file if argument is greater than number of lines in file()', function () {
      let mockFs = { readFileSync: readVowels, existsSync: existsSync };
      it('for single file node ./tail.js -n7 vowels.txt', function () {
        let args = { option: "n", count: 7, files: ["vowels.txt"] };
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "a\ne\ni\no\nu";
        assert.deepEqual(actualOut, expectedOut);
      });

      it('for multiple files node ./tail.js -n7 vowels.txt vowels.txt', function () {
        let args = { option: "n", count: 7, files: ["vowels.txt", "vowels.txt"] };
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "==> vowels.txt <==\n";
        expectedOut += "a\ne\ni\no\nu\n\n";
        expectedOut += "==> vowels.txt <==\n";
        expectedOut += "a\ne\ni\no\nu";
        assert.deepEqual(actualOut, expectedOut);
      });
    });

    describe('should handle -c should return as many characters as specified', function () {
      let mockFs = { readFileSync: readNumbers, existsSync: existsSync };

      it('for single file node ./tail.js -c5 file1', function () {
        let args = { option: "c", count: 5, files: ["numbers.txt"] };
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "2\n1\n0";
        assert.deepEqual(actualOut, expectedOut);
      });

      it('for multiple files node ./tail.js -c4 file1 file1', function () {
        let args = { option: "c", count: 5, files: ["numbers.txt", "numbers.txt"] };
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "==> numbers.txt <==\n";
        expectedOut += "2\n1\n0\n\n";
        expectedOut += "==> numbers.txt <==\n";
        expectedOut += "2\n1\n0";
        assert.deepEqual(actualOut, expectedOut);
      });
    });
    describe('should provide error for', function () {
      let mockFs = { readFileSync: readNumbers, existsSync: existsSync };

      it('missing single file => node ./tail.js -n5 fileDoesNotExist', function () {

        let args = { option: "n", count: 5, files: ["fileDoesNotExist"] };
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "tail: fileDoesNotExist: No such file or directory";

        assert.deepEqual(actualOut, expectedOut);
      });

      it('missing multiple files => node ./tail.js -n5 fileDoesNotExist fileDoesNotExist', function () {
        let args = { option: "n", count: 5, files: ["fileDoesNotExist", "fileDoesNotExist"] };
        let actualOut = runCommand(args, context, mockFs);

        let expectedOut = "tail: fileDoesNotExist: No such file or directory\n\n";
        expectedOut += "tail: fileDoesNotExist: No such file or directory";
        assert.deepEqual(actualOut, expectedOut);
      });

      describe('missing files but also list other files that are present', function () {
        it('should provide error message for a missing file listed at the end', function () {
          let args = { option: "n", count: 5, files: ["numbers.txt", "numbers.txt", "fileDoesNotExist"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "==> numbers.txt <==\n";
          expectedOut += "4\n3\n2\n1\n0\n\n";
          expectedOut += "==> numbers.txt <==\n";
          expectedOut += "4\n3\n2\n1\n0\n\n";
          expectedOut += "tail: fileDoesNotExist: No such file or directory";
          assert.deepEqual(actualOut, expectedOut);
        });
        it('should provide error message for the first file which is missing', function () {
          let args = { option: "n", count: 5, files: ["fileDoesNotExist", "numbers.txt", "numbers.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "tail: fileDoesNotExist: No such file or directory\n\n";
          expectedOut += "==> numbers.txt <==\n";
          expectedOut += "4\n3\n2\n1\n0\n\n";
          expectedOut += "==> numbers.txt <==\n";
          expectedOut += "4\n3\n2\n1\n0";
          assert.deepEqual(actualOut, expectedOut);
        });
      });

      describe('illegal offset', function () {
        it("should return illeal offset error message for -n", function () {
          let args = { option: "n", count: "c", files: ["numbers.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "tail: illegal offset -- c";
          assert.deepEqual(actualOut, expectedOut);
        });
        it("should return illeal offset error message for -c", function () {
          let args = { option: "c", count: "n", files: ["numbers.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "tail: illegal offset -- n";
          assert.deepEqual(actualOut, expectedOut);
        });
      });

      describe('for illegal option', function () {
        it("should return illegal option usage error message", function () {
          let args = { option: "v", count: 3, files: ["numbers.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "tail: illegal option -- v\n";
          expectedOut += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
          assert.deepEqual(actualOut, expectedOut);
        });
      });
    });

  });


  describe('for head', function () {
    let file1 = "numbers.txt";
    let file2 = "vowels.txt";
    let file3 = "fifTeenLines.txt";
    let expectedFile1Content = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9"; //10 lines => default number of line =10
    let expectedFile2Content = "a\ne\ni\no\nu";                //less than 10 lines
    let expectedFile3Content = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14"; // more than 10 lines

    let readNumbers = readFileSync(file1, "utf8", expectedFile1Content);
    let readVowels = readFileSync(file2, "utf8", expectedFile2Content);
    let read15Numbers = readFileSync(file1, "utf8", expectedFile3Content);

    let context = "head";

    describe("should handle default argument case", function () {
      let mockFs = { readFileSync: read15Numbers, existsSync: existsSync };
      let args = { option: "n", count: 10, files: ["fifTeenLines.txt"] };

      it('for single file : node ./head.js fifTeenLines.txt', function () {
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "0\n1\n2\n3\n4\n5\n6\n7\n8\n9";
        assert.deepEqual(actualOut, expectedOut);
      });

      it('for multiple files : node ./head.js fifTeenLines.txt fifTeenLines.txt', function () {
        let args = { option: "n", count: 10, files: ["fifTeenLines.txt", "fifTeenLines.txt"] };
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "==> fifTeenLines.txt <==\n";
        expectedOut += "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n\n";
        expectedOut += "==> fifTeenLines.txt <==\n";
        expectedOut += "0\n1\n2\n3\n4\n5\n6\n7\n8\n9";
        assert.deepEqual(actualOut, expectedOut);
      });
    });

    describe("for file that has fewer than default number of lines", function () {
      let mockFs = { readFileSync: readVowels, existsSync: existsSync };

      it("for single file node ./head.js vowels.txt", function () {
        let args = { option: "n", count: 10, files: ["vowels.txt"] };

        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "a\ne\ni\no\nu";
        assert.deepEqual(actualOut, expectedOut);
      });

      it('for multiple files node ./head.js vowels.txt vowels.txt', function () {
        let args = { option: "n", count: 10, files: ["vowels.txt", "vowels.txt"] };
        let actualOut = runCommand(args, context, mockFs);
        let expectedOut = "==> vowels.txt <==\n";
        expectedOut += "a\ne\ni\no\nu\n\n";
        expectedOut += "==> vowels.txt <==\n";
        expectedOut += "a\ne\ni\no\nu";
        assert.deepEqual(actualOut, expectedOut);
      });

    });

    describe('should only list as many lines as specified', function () {
      let mockFs = { readFileSync: readNumbers, existsSync: existsSync };
      describe("should return first 5 lines ", function () {

        it("for single file node ./head.js -n5 numbers.txt", function () {
          let args = { option: "n", count: 5, files: ["numbers.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "0\n1\n2\n3\n4";
          assert.deepEqual(actualOut, expectedOut);
        });

        it("for multiple files node ./head.js numbers.txt numbers.txt", function () {
          let args = { option: "n", count: 5, files: ["numbers.txt", "numbers.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "==> numbers.txt <==\n";
          expectedOut += "0\n1\n2\n3\n4\n\n";
          expectedOut += "==> numbers.txt <==\n";
          expectedOut += "0\n1\n2\n3\n4";
          assert.deepEqual(actualOut, expectedOut);
        });

      });
      describe('should list the contents of the entire file if argument is greater than number of lines in file()', function () {
        let mockFs = { readFileSync: readVowels, existsSync: existsSync };
        it('for single file node ./head.js -n7 vowels.txt', function () {
          let args = { option: "n", count: 7, files: ["vowels.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "a\ne\ni\no\nu";
          assert.deepEqual(actualOut, expectedOut);
        });

        it('for multiple files node ./head.js -n7 vowels.txt vowels.txt', function () {
          let args = { option: "n", count: 7, files: ["vowels.txt", "vowels.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "==> vowels.txt <==\n";
          expectedOut += "a\ne\ni\no\nu\n\n";
          expectedOut += "==> vowels.txt <==\n";
          expectedOut += "a\ne\ni\no\nu";
          assert.deepEqual(actualOut, expectedOut);
        });
      });

      describe('should handle -c should return as many characters as specified', function () {
        let mockFs = { readFileSync: readNumbers, existsSync: existsSync };

        it('for single file node ./head.js -c5 file1', function () {
          let args = { option: "c", count: 5, files: ["numbers.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "0\n1\n2";
          assert.deepEqual(actualOut, expectedOut);
        });

        it('for multiple files node ./head.js -c4 file1 file1', function () {
          let args = { option: "c", count: 5, files: ["numbers.txt", "numbers.txt"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "==> numbers.txt <==\n";
          expectedOut += "0\n1\n2\n\n";
          expectedOut += "==> numbers.txt <==\n";
          expectedOut += "0\n1\n2";
          assert.deepEqual(actualOut, expectedOut);
        });
      });

      describe('should provide error for', function () {
        let mockFs = { readFileSync: readNumbers, existsSync: existsSync };

        it('missing single file => node ./head.js -n5 fileDoesNotExist', function () {

          let args = { option: "n", count: 5, files: ["fileDoesNotExist"] };
          let actualOut = runCommand(args, context, mockFs);
          let expectedOut = "head: fileDoesNotExist: No such file or directory";

          assert.deepEqual(actualOut, expectedOut);
        });

        it('missing multiple files => node ./head.js -n5 fileDoesNotExist fileDoesNotExist', function () {
          let args = { option: "n", count: 5, files: ["fileDoesNotExist", "fileDoesNotExist"] };
          let actualOut = runCommand(args, context, mockFs);

          let expectedOut = "head: fileDoesNotExist: No such file or directory\n\n";
          expectedOut += "head: fileDoesNotExist: No such file or directory";
          assert.deepEqual(actualOut, expectedOut);
        });

        describe('missing files but also list other files that are present', function () {
          it('should provide error message for a missing file listed at the end', function () {
            let args = { option: "n", count: 5, files: ["numbers.txt", "numbers.txt", "fileDoesNotExist"] };
            let actualOut = runCommand(args, context, mockFs);
            let expectedOut = "==> numbers.txt <==\n";
            expectedOut += "0\n1\n2\n3\n4\n\n";
            expectedOut += "==> numbers.txt <==\n";
            expectedOut += "0\n1\n2\n3\n4\n\n";
            expectedOut += "head: fileDoesNotExist: No such file or directory";
            assert.deepEqual(actualOut, expectedOut);
          });

          it('should provide error message for the first file which is missing', function () {
            let args = { option: "n", count: 5, files: ["fileDoesNotExist", "numbers.txt", "numbers.txt"] };
            let actualOut = runCommand(args, context, mockFs);
            let expectedOut = "head: fileDoesNotExist: No such file or directory\n\n";
            expectedOut += "==> numbers.txt <==\n";
            expectedOut += "0\n1\n2\n3\n4\n\n";
            expectedOut += "==> numbers.txt <==\n";
            expectedOut += "0\n1\n2\n3\n4";
            assert.deepEqual(actualOut, expectedOut);
          });
        });

        describe('illegal count', function () {
          it("should return illeal line count error message for -n", function () {
            let args = { option: "n", count: "v", files: ["numbers.txt"] };
            let actualOut = runCommand(args, context, mockFs);
            let expectedOut = "head: illegal line count -- v";
            assert.deepEqual(actualOut, expectedOut);
          });
          it("should return illeal byte count error message for -c", function () {
            let args = { option: "c", count: "v", files: ["numbers.txt"] };
            let actualOut = runCommand(args, context, mockFs);
            let expectedOut = "head: illegal byte count -- v";
            assert.deepEqual(actualOut, expectedOut);
          });
        });

        describe('for illegal option', function () {
          it("should return illegal option usage error message", function () {
            let args = { option: "v", count: 3, files: ["numbers.txt"] };
            let actualOut = runCommand(args, context, mockFs);
            let expectedOut = "head: illegal option -- v\n";
            expectedOut += "usage: head [-n lines | -c bytes] [file ...]";
            assert.deepEqual(actualOut, expectedOut);
          });
        });

      });

    });

  });
});