#!/usr/bin/env node
require('shelljs/global');

var fs = require('fs');
var http = require('http'); 
var request = require("request");
var progress = require('request-progress');
var promisePipe = require("promisepipe");

var gradle_file_name = "gradle-2.2.1-all.zip"
var src = 'distributions/' + gradle_file_name;
var pwd = process.cwd()  
var output = pwd  + '/' + gradle_file_name	;

var urll = "https://services.gradle.org/distributions/gradle-2.2.1-all.zip"
// urll = 'https://github.com/i5ting/awesome-mac-practice/blob/master/app/AxureRP-extension-for-Chrome-0.6.zip?raw=true'

var file_name_arr = __dirname.split('/')
file_name_arr.pop()

var file_name =  file_name_arr.join('/') + "/index.js"
var www_gradle_zip_file = file_name_arr.join('/') + "/www/" + gradle_file_name
var is_exist_www_gradle_zip_file = false;
fs.exists(www_gradle_zip_file, function (exists) {
	if(exists == true){
		is_exist_www_gradle_zip_file = true;
	}
});
		
fs.exists(output, function (exists) {
	if(exists == true){
		// 如果文件已经存在，就直接启动服务器
		start_server();
	}else{
		console.log(output + " file not exist, start download it,maybe need some time...")
		// 本地没有zip，但是www里有zip，也可以启动
		if(is_exist_www_gradle_zip_file == true){
			start_server();
			return;
		}
		
		promisePipe(
			// Note that the options argument is optional
			progress(request(urll), {
			    throttle: 2000,  // Throttle the progress event to 2000ms, defaults to 1000ms
			    delay: 1000      // Only start to emit after 1000ms delay, defaults to 0ms
			})
			.on('progress', function (state) {
			    console.log('received size in bytes', state.received);
			    // The properties bellow can be null if response does not contain
			    // the content-length header
			    console.log('total size in bytes', state.total);
			    console.log('percent', state.percent + '%');
			})
			.on('error', function (err) {
			    // Do something with err
			})
			.pipe(fs.createWriteStream(output))
			.on('error', function (err) {
			    // Do something with err
			})
			.on('close', function (err) {
			    // Saved to doogle.png!
			})
		).then(function(streams){
		    console.log("Yay, all streams are now closed/ended/finished!");
				start_server();
		}, function(err) {
		    console.log("This stream failed:", err.source);
		    console.log("Original error was:", err.originalError);
		});
		
	}
});


function start_server(){

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
	if (exec('node '+ file_name + ' ' + process.argv[2] ).code !== 0) {
	  echo('Error: Local Gradle Server startup failed');
	  exit(1);
	}
}
 