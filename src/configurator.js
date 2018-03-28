module.exports = {
  configure: function(configFilePath, environmentFilePath, outputFilePath, outputEnvFilePath) {
    var Mustache = require('mustache'); 
    var fs = require('fs');
    
    var configContents = fs.readFileSync(configFilePath, 'utf8')
    var environmentContents = fs.readFileSync(environmentFilePath, 'utf8')

    var environmentJSON = JSON.parse(environmentContents);

    var output = Mustache.render(configContents, environmentJSON);
    console.log("Saving to:", outputFilePath);

    fs.writeFile(outputFilePath, output, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The config file was saved!");
    });

    fs.writeFile(outputEnvFilePath, JSON.stringify(environmentJSON), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The env file was saved!");
    });
  },
  hook: function(hook, configPath, configTmplPath) {
    var fs = require('fs');
    
    if (!configPath) {
      configPath = './config.xml';
    }
    if (!configTmplPath) {
      configTmplPath = './ionic-configurator/config.tmpl.xml';
    }
    
    if (hook === 'before_plugin_add' || hook === 'before_plugin_rm') {
      fs.writeFileSync(configPath, fs.readFileSync(configTmplPath));
    } else if (hook === 'after_plugin_add' || hook === 'after_plugin_rm') {
      fs.writeFileSync(configTmplPath, fs.readFileSync(configPath)); 
    }
  }
}
