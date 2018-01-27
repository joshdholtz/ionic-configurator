# Ionic Configurator

## Commands

```sh
$: npm run ionic-config <environment>
```
where `<environment>` environment will look for a file `./ionic-configurator/env.<environment>.json`


## Setup


### package.json
```json
"scripts": {
    "ionic-config": "ionic-config"
}
```

### ionic-configurator/config.tmpl.xml
```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="{{id}}" version="{{version}}" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <hook src="ionic-configurator/hooks.js" type="before_plugin_add" />
    <hook src="ionic-configurator/hooks.js" type="after_plugin_add" />
    <hook src="ionic-configurator/hooks.js" type="before_plugin_rm" />
    <hook src="ionic-configurator/hooks.js" type="after_plugin_rm" />
    <name>{{name}}</name>
    <description>{{description}}</description>
    <author email="hi@ionicframework" href="http://ionicframework.com/">Ionic Framework Team</author>
    <content src="index.html" />
    ...
</widget>
```

### ionic-configurator/env.staging.json
```json
{
  "id": "com.joshholtz.staging.IonicApp",
  "version": "1.1.2",
  "name": "Ionic App (Staging)",
  "description": "This awesome Ionic app description <3"
}

```

### ionic-configurator/env.production.json
```json
{
  "id": "com.joshholtz.IonicApp",
  "version": "1.1.2",
  "name": "Ionic App",
  "description": "This awesome Ionic app description <3"
}

```

### ionic-configurator/hooks.js
```js
#!/usr/bin/env node
module.exports = function(ctx) {
  var Configurator = require('ionic-configurator');
  Configurator.hook(ctx.hook);
}
```
