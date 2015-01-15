var express = require('express')
var path = require('path')
var app = express()
var port = 5678

app.use(express.static(path.join(__dirname, 'www')));

app.get('/', function (req, res) {
  res.send('distributionUrl=http\://127.0.0.1:' + port + '/gradle-2.2.1-all.zip')
})

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port
	
  console.log('Local Gradle Server listening at http://%s:%s', host, port)
	console.log(('distributionUrl=http\://127.0.0.1:' + port + '/gradle-2.2.1-all.zip'))
})