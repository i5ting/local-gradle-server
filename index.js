var express = require('express')
var path = require('path')
var open = require("open");
var clip = require('cliparoo');

var app = express()
var port = 5678 
var is_open = process.argv[2] == '-o' ? true :false;

app.use(express.static(path.join(__dirname, 'www')));

app.get('/', function (req, res) {
  res.send('distributionUrl=http\\://127.0.0.1:' + port + '/gradle-2.2.1-all.zip')
})

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
	
  console.log('Local Gradle Server listening at http://%s:%s', host, port)
	
	var gradle_need_text = 'distributionUrl=http\\://127.0.0.1:' + port + '/gradle-2.2.1-all.zip';
	console.log(gradle_need_text)
	
	// open in browser
	if(is_open){
		open("http://127.0.0.1:" + port + "/");
	}
	
	// copy to clip
	clip(gradle_need_text, function(err){
	  if (err) {
	  	console.log("can't copied!");
	  }
	  console.log('copied! you can paste anywhere');
	});
	
})