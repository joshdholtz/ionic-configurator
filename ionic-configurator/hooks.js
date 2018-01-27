#!/usr/bin/env node
module.exports = function(ctx) {
  var Configurator = require('ionic-configurator');
  Configurator.hook(ctx.hook);
}
