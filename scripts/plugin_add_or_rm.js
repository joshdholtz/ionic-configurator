#!/usr/bin/env node

module.exports = function(ctx) {
  var fs = require('fs');
  
  var hook = ctx.hook;
  
  if (hook === 'before_plugin_add' || hook === 'before_plugin_rm') {
    fs.writeFileSync('./config.xml', fs.readFileSync('./config/config-template.xml'));
  } else if (hook === 'after_plugin_add' || hook === 'after_plugin_rm') {
    fs.writeFileSync('./config/config-template.xml', fs.readFileSync('config.xml'));  
  }
}
