"use strict";

var exec = require('child_process').exec;
var commander = require('commander');
var path = require('path');
var gitPath = path.resolve(__dirname, 'git.sh');

function execCommand(command, callback) {
  var childProcess = exec(command, function(err, stdout, stderr) {
    if (err) return callback(new Error(err), null);
    if (typeof stderr !== 'string') return callback(new Error(stderr), null);
    return callback(null, stdout);
  });  
}

commander.version('1.0.0')
  .option('-c --config <path>', 'config path. defaults to ./')
  .parse(process.argv);

execCommand(`bash ${gitPath}`, function(err, result) {
  if (err) return console.error(err);
  const srcFiles = result.split('\n');
  const changedFiles = [];
  for (let i = 0, max = srcFiles.length; i < max; i +=1) {
    if (srcFiles[i]) {
      changedFiles.push(srcFiles[i].replace(/(^[D|M|A])|\t|\r|\n/g, ''));
    }
  }

  const command = `eslint -c ${commander.config} ${changedFiles.join(' ')}`; 
  exec(command, function(err, stdout, stderr) {
    if (err) console.error(err);
    console.log(stdout);
  });
});
