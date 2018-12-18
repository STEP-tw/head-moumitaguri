1. tail usage is not there in README.md
2. libTest.js:6 unused functions  
3. autosave files feature in vscode
4. commented code libTest.js:10 11
5. order of tests in libTest.js
6. displayFileName is in lib.js which is not lib.js's concern
7. unnecessary comments in test : displayName() ,"()"  is not necessary
8. duplication in tests : displayFileName : the description is too specific for a particular test.
9. can be separated the actualOut and expectedOut in assert case.
10. in libTest.js the tests for getNChars() , the expected output  is not explicit and
    the variable declaration for content, have not used let or const.
11. misleading functon name : readFileSync  and existsSync in libTest.js do not seem as a mockReader and mockExistsSync.
13. fs also does not seem as a mockFs. line number : 50
12. primitive obsession :  in extractFiles to pass existsSync and readFileSync
13. mockReadFileSync and mockExistsSync are in libTest.js which can be in somewhere else like "test/file/util"

14. mock readFileSync and mock existsSync are inconsistent , i.e. both are not generic . existsSync is hardcoded.

15. line 53 and 54 : unused codes.
16. extractFiles : poor naming. for this i have to mention the context everytime.
17. line 59 and 60 : expectedFileContent should be explicit which will make the arguments consistent in nature.
18. we can use different describe blocks for head and tail for extractFiles().

19. line 63 : option is implicitly mentioned. this job is of parseInput  whereas it is done in library.

20. In extractFiles : context is not in args list.

21. poor naming : line 87 : readNotFoundFile
22. expected and expectedOut are the same string. no need to rewrite .as strings are immutabele.
23. we can use const instead of let for those variable which are not modified afterwards.
24. mockReadFileSync has to be able to work for multiple files.

25. deepEqual is not necessary for string

lib.js

1. line 12 : unnecessarily long relative path.
2. unused code.

3. In getNChars and getNLines duplication can be reduced.
4. displayFileName and addHeader functions are not lib's concern.
5. line 48. In formatFileContent() parsedInput has files and there is another argument as file .
6. too long argument list
7. context is outside of parsedInput.

utilTest.js

1. line 6 to 11 : misleading functions, unused .
2. line 15, 22, 28 : tests should be separated.

util.js

1. line 13 : unnecessary comments

parseInputTest.js

1. line 4 : test description should not be in describe.
2. line 5 to 53 : 'should work' is a wrong statement for it. input and      output should be specified.
3. line 7 to end : parsedInput should be expected output.
4. actual output can be separated.

parseInput.js

1. line 7: poor naming
2. line 7, 14, 23, 29, 39 , 44 : no tests for these functions

errorCheckTest.js

1. no test for printNotFoundError, hasIllegalInputs, showError, addHeader
2. line 16 19 22 : it statement can be better. 
3. actual output can be separated.
4. line 52 55 if statement can be better.
5. unreadable tests.

errorCheck.js

1. constant variables should be named in caps and use snake case.
2. line 7, 9, 21, 25, 40, 44 : confusing naming
3. constant variables should be at first.
4. hierarchy must be understandable.

lib.js

1. line 44: function name

libTest.js

1. line 11: ";" missing
2. line 21 : test description should be explicit
3. line 27, 53 : misleading tests
4. line 37, 59 : misleading tests
5. line 97, 98 : readFileSync should not take 3 arguments
