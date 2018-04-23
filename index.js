"use strict";

var commander = require('commander');
var path = require('path');
var shell = require('shelljs');
var color = require('./lib/colorResult');
var getChangedFiles = require('./lib/filesFinder');

function list(value) {
  if (!value) return [];
  return value.split(',');
}

commander.version('1.0.0')
  .option('-c --config <path>', 'config path. defaults to ./')
  .option('--targetDir <items>', 'target dir to run eslint', list)
  .parse(process.argv);

var changeFiles = getChangedFiles(commander.targetDir);
if (!changeFiles || changeFiles.length === 0) return;
var command = `eslint -c ${commander.config} ${changeFiles.join(' ')}`; 
var result = shell.exec(command, { silent: true }).stdout;

console.log(color(result));
