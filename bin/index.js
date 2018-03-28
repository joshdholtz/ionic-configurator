#!/usr/bin/env node

if (process.argv.length > 2) {
  var Configurator = require('../src/configurator.js')
  
  var configFilePath = './ionic-configurator/config.tmpl.xml';
  var environmentFilePath = './ionic-configurator/env.' + process.argv[2] + '.json';
  var outputFilePath = './config.xml';
  var outputEnvFilePath = './ionic-configurator-env.json';
  
  if (process.argv.length > 4) {
    configFilePath = process.argv[2];
    environmentFilePath = process.argv[3];
    outputFilePath = process.argv[4];
    outputEnvFilePath = process.argv[5];
  }
  
  Configurator.configure(configFilePath, environmentFilePath, outputFilePath, outputEnvFilePath);
} else {
  console.log("Invalid arguments")
}
