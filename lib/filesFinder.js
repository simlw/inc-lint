"use strict";

var shell = require('shelljs');
var path = require('path');

function isTarget(targetDirs, file) {
  if (!isJsFile(srcFiles[i])) return false;

  if (targetDirs && Array.isArray(targetDirs) && targetDirs.length > 0) {
    for (var i = 0, max = targetDirs.length; i < max; i += 1) {
      if (path.resolve(file).includes(path.resolve(targetDirs[i]))) return true;
    }
  } 

  return false;
}

function isDeleted(file) {  
  return /^D{1}/.test(file);
}

function isJsFile(file) {
  return ['.js', '.jsx'].includes(path.extname(file).toLowerCase());
}

function getChangedFiles(targetDir) {
  var diffInfo = shell.exec('git diff --cached --name-status', { silent: true }).stdout;
  var srcFiles = diffInfo.split('\n');
  var changedFiles = [];
  for (let i = 0, max = srcFiles.length; i < max; i +=1) {
    // if file is deleted, continue
    if (isDeleted(srcFiles[i])) continue;
    
    var file = srcFiles[i].replace(/(^[M|A])/, '').replace(/\t|\n|\r/g, '');
    if (file && isTarget(targetDir, file)) changedFiles.push(file);
  }

  return changedFiles;
}

module.exports = getChangedFiles; 
