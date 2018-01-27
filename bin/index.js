#!/usr/bin/env node

var Mustache = require('mustache'); 
var fs = require('fs');

if (process.argv.length > 4) {
  var configFilePath = process.argv[2];
  var environmentFilePath = process.argv[3];
  var outputFilePath = process.argv[4];
  
  console.log("Configuring:", configFilePath);
  console.log("With Environment:", environmentFilePath);
  
  var configContents = fs.readFileSync(configFilePath, 'utf8')
  var environmentContents = fs.readFileSync(environmentFilePath, 'utf8')
  
  var environmentJSON = JSON.parse(environmentContents);

  var output = Mustache.render(configContents, environmentJSON);
  console.log("Saving to:", outputFilePath);
  
  fs.writeFile(outputFilePath, output, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }); 
} else {
  console.log("Invalid arguments")
}
