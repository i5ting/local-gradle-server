#!/usr/bin/env node

require('shelljs/global');

var file_name_arr = __dirname.split('/')
file_name_arr.pop()

var file_name =  file_name_arr.join('/')+ "/index.js"

console.log(file_name)

// Run external tool synchronously
if (exec('node '+ file_name).code !== 0) {
  echo('Error: Local Gradle Server startup failed');
  exit(1);
}