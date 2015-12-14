#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var webapiMediastream = require('./');
var argv = process.argv.slice(2);

function help() {
  console.log([
    '',
    '  ' + pkg.description,
    '',
    '  Example:',
    '    webapi-mediastream ',
    ''
  ].join('\n'));
}

function version() {
  console.log('package version:', pkg.version);
  console.log('process.version:', process.version);
}

if (argv.indexOf('--help') !== -1) {
  help();
  return;
}

if (argv.indexOf('--version') !== -1) {
  version();
  return;
}


webapiMediastream(argv[0], function() {

});
