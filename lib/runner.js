const Promise = require('bluebird');
const runProcess = require('./asyncProcess').runProcess;
const projectTypes = require('./enums').projectTypes;


async function runApplication(path, projectType){
    switch(projectType){
        case projectTypes.Javascript:
            npmStart(path);
            break;
        case projectTypes.Rails:
            railsStart(path);
            break;
        default:
            break;
    }
}

function npmStart(path){
    runProcess('npm', ['start', `--prefix ${path}`]);
    process.exit();
}

function railsStart(path){
    runProcess("rails", ["server"]);
    process.exit();
}

module.exports = runApplication;