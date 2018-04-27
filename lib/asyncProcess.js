const Promise = require('bluebird');
const cmd = require('node-cmd');
const spawn = require('child_process').spawn;

const getProcessAsync = Promise.promisify(cmd.get, { multiArgs: true, context: cmd });
const runProcessAsync = Promise.promisify(cmd.run, { multiArgs: true, context: cmd });
const runProcess = (processName, args, useShell = true, detached = true) => { 
    const proc = spawn(processName, args, { shell: useShell, detached: detached });
    proc.on("error", (error) => console.log(`Could not start rails server: ${error}`));
}


module.exports = {
    getProcessAsync, 
    runProcessAsync,
    runProcess
}