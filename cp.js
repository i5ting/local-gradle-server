var fs = require('fs'),
    path = require('path'),
    out = process.stdout;

var request = require("request");

urll = 'https://github.com/i5ting/awesome-mac-practice/blob/master/app/AxureRP-extension-for-Chrome-0.6.zip?raw=true'

var promisePipe = require("promisepipe");



var output = '~'

 

promisePipe(
    request(urll).pipe(fs.createWriteStream(output))
).then(function(streams){
    console.log("Yay, all streams are now closed/ended/finished!");
}, function(err) {
    console.log("This stream failed:", err.source);
    console.log("Original error was:", err.originalError);
});