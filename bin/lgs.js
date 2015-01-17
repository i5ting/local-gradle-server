#!/usr/bin/env node
require('shelljs/global');

var Download = require('download');
var fs = require('fs');
var http = require('http');
var Promise = require("bluebird");
var request = require("request");

var promisePipe = require("promisepipe");

var gradle_file_name = "gradle-2.2.1-all.zip"
var src = 'distributions/' + gradle_file_name;
var pwd = process.cwd()  

// pwd = 
var output = pwd  + '/' + gradle_file_name	;
 

console.log(src)
console.log(output)


var urll = "https://services.gradle.org/distributions/gradle-2.2.1-all.zip"

fs.exists(output, function (exists) {
	if(exists == true){
		// 如果文件已经存在，就直接启动服务器
		start_server();
	}else{
		console.log(output + " file not exist, start download it,maybe need some time...")
		
		urll = 'https://github.com/i5ting/awesome-mac-practice/blob/master/app/AxureRP-extension-for-Chrome-0.6.zip?raw=true'
		
		// request(urll).pipe(fs.createWriteStream(output))
		function clientError(e) {
		    return e.code >= 400 && e.code < 500;
		}
		
		promisePipe(
		    request(urll).pipe(fs.createWriteStream(output))
		).then(function(streams){
		    console.log("Yay, all streams are now closed/ended/finished!");
				start_server();
		}, function(err) {
		    console.log("This stream failed:", err.source);
		    console.log("Original error was:", err.originalError);
		});
		
	}
});

var file_name_arr = __dirname.split('/')
file_name_arr.pop()

var file_name =  file_name_arr.join('/') + "/index.js"

function start_server(){
	var www_gradle_zip_file = file_name_arr.join('/') + "/www/" + gradle_file_name
	fs.exists(www_gradle_zip_file, function (exists) {
		if(exists == true){
			start_node_server();
		}else{
			var readStream = fs.createReadStream(output);
			var writeStream = fs.createWriteStream(www_gradle_zip_file);

			readStream.on('data', function(chunk) { // 当有数据流出时，写入数据
		    if (writeStream.write(chunk) === false) { // 如果没有写完，暂停读取流
	        readStream.pause();
		    }
			});

			writeStream.on('drain', function() { // 写完后，继续读取
		    readStream.resume();
			});

			readStream.on('end', function() { // 当没有数据时，关闭数据流
		    writeStream.end();
				start_node_server();
			});
		}
	});
	// console.log(file_name)
}

function start_node_server(){
	// Run external tool synchronously
	if (exec('node '+ file_name).code !== 0) {
	  echo('Error: Local Gradle Server startup failed');
	  exit(1);
	}
}

function download(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};