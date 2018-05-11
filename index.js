"use strict";

var commander = require('commander');
const cli = require('./lib/cli');

function list(value) {
  if (!value) return [];
  return value.split(',');
}

commander.version('1.0.0')
  .option('-c --config <path>', 'config path. defaults to ./')
  .option('--targetDir <items>', 'target dir to run eslint', list)
  .parse(process.argv);

process.exitCode = cli.execute(commander);
