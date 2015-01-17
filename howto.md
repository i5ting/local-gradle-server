# 如何完成

## gradle文件下载的问题

实际上自己下载https://services.gradle.org/distributions/gradle-2.2.1-all.zip文件，然后起一个http-server就可以很好的解决了

但是手贱，写了一下，发现其实想写好也不太容易

## 技术栈

- request + fs.createWriteStream 完成下载
- promisePipe提供了stream完成后的回调，解决了node异步导致的流程控制问题
- request-progress 解决了下载进度查看的问题
- open 在浏览器里打开地址
- cliparoo 复制内容到剪贴板
- shelljs 执行命令

相关url地址

- https://github.com/epeli/node-promisepipe
- https://github.com/request/request
- https://github.com/IndigoUnited/node-request-progress
- https://github.com/tj/node-cliparoo
- http://documentup.com/arturadib/shelljs

## 用法

### 下载和进度
		
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

### shelljs

	// Run external tool synchronously
	if (exec('node '+ file_name + ' ' + process.argv[2] ).code !== 0) {
	  echo('Error: Local Gradle Server startup failed');
	  exit(1);
	}

### cliparoo

	// copy to clip
	clip(gradle_need_text, function(err){
	  if (err) {
	  	console.log("can't copied!");
	  }
	  console.log('copied! you can paste anywhere');
	});
	
### open

	// open in browser
	if(is_open){
		open("http://127.0.0.1:" + port + "/");
	}
	
	
就不写了，在代码中，自己看吧，欢迎提交issue

https://github.com/i5ting/local-gradle-server