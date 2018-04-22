"use strict";

var chalk = require('chalk');
var path = require('path');

function isError(line) {
  return /\d+:\d+\s+error/.test(line);
}

function isWarning(line) {
  return /\d+:\d+\s+warning/.test(line);
}

function processLine(line) {
  // file path
  if (path.isAbsolute(line)) {
    return chalk.rgb(185, 192, 203).underline(line);
  }

  // error 
  if (isError(line)) {
    return line.replace('error', chalk.red('error'));
  }

  // warning
  if (isWarning(line)) {
    return line.replace('warning', chalk.yellow('warning'));
  }

  return line;
}

module.exports = function(result) {
  if (!result) return;

  var result = result.split('\n').map(function(line) {
    return processLine(line);
  });

  return result.join('\n');
};
