const { createHeading
} = require('../src/output.js');

describe ('createHeading' , function() {
    it ('should take a string as input and return ==> string <== ' , function() {
        let actualOut = createHeading("text");
        let expectedOut = "==> text <==";
        assert.equal(actualOut,expectedOut);
    });
});