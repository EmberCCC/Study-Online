var crypto = require('crypto');

function testAndPrintPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

// run node app/mocks/password.js
console.log(testAndPrintPwd('123456'));

