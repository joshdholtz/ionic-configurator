# Ionic Configurator
Somewhat easily reconfigure Ionic's `config.xml` for different environments by running `npm run ionic-config <environment>`.

View working example: https://github.com/joshdholtz/ionic-configurator-example

## Installation
```sh
$: npm install --save-dev https://github.com/joshdholtz/ionic-configurator.git
```

## Commands

```sh
$: npm run ionic-config <environment>
```
where `<environment>` environment will look for a file `./ionic-configurator/env.<environment>.json`


## Setup


### package.json
Add `ionic-config` to your `package.json` scripts. This will allow you to run `npm run ionic-config <environment>` instead of having to run `./node_modules/.bin/ionic-config <environment>`
```json
"scripts": {
    "ionic-config": "ionic-config"
}
```

### ionic-configurator/config.tmpl.xml
Create a `config.tmpl.xml` file in the `ionic-configurator` directory. This is the template `config.xml` file that all environment specific `config.xml` files will be made from.

The `config.tmpl.xml` file uses [Mustache templating](https://github.com/janl/mustache.js)

```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="{{id}}" version="{{version}}" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <!--- These hooks are used to modify the config.tmpl.xml file when plugins are added and removed  -->
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

### Environment file
Create environment files using the pattern `env.<environment>.json` in `ionic-configurator`. These keys should match up with the Mustache templating used in the `config.tmpl.xml` file.

#### ionic-configurator/env.staging.json
```json
{
  "id": "com.joshholtz.staging.IonicApp",
  "version": "1.1.2",
  "name": "Ionic App (Staging)",
  "description": "This awesome Ionic app description <3"
}

```

#### ionic-configurator/env.production.json
```json
{
  "id": "com.joshholtz.IonicApp",
  "version": "1.1.2",
  "name": "Ionic App",
  "description": "This awesome Ionic app description <3"
}

```

### ionic-configurator/hooks.js
This hooks is used when plugins are added and removed. This will temporarily move the template to `config.xml` and then back to `ionic-configurator/config.tmpl.xml` so that the plugin changes are recorded in our templated.

**NOTE:** This will keep the templated config at `config.xml` so you will need to re-run `ionic-config <environment>`
```js
#!/usr/bin/env node
module.exports = function(ctx) {
  var Configurator = require('ionic-configurator');
  Configurator.hook(ctx.hook);
}
```
