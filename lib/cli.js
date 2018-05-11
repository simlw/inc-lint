var shell = require('shelljs');
var getChangedFiles = require('./filesFinder');
var color = require('./colorResult');

function printResult(results) {
  console.log(color(results));
}

const cli = {
  execute(commander) {
    const changeFiles = getChangedFiles(commander.targetDir);
    if (!changeFiles || changeFiles.length === 0) return;

    const command = `eslint -c ${commander.config} ${changeFiles.join(' ')}`; 

    const { code, stdout } = shell.exec(command, { silent: true });

    if (stdout && stdout !== 'undefined') {
      printResult(stdout);
    }

    return code;
  },
};

module.exports = cli;