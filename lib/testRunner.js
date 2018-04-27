const Promise = require('bluebird');
const getProcess = require('./asyncProcess').getProcessAsync;
const projectTypes = require('./enums').projectTypes;

async function runTests(path, projectType){
    return new Promise((resolve, reject) => {
        console.log("Running unit tests, this may take a while...");
        switch(projectType){
            case projectTypes.Javascript:
                runJavascriptTests(path)
                    .then(() => resolve({path: path, projectType: projectType}))
                    .catch((err) => reject(err));
                break;
            case projectTypes.Rails:
                runRailsTests(path)
                    .then(() => resolve({path: path, projectType: projectType}))
                    .catch((err) => reject(err));
                break;
            default:
                reject("invalid project type");
                break;
        }   
    });
}

function runJavascriptTests(path){
    return new Promise((resolve, reject) => {
        getProcess("npm run test").then(data => {
            console.log(`${data}`);
            resolve(path);
        }).catch(err => {
            console.log("npm run test failed: ", err);
            resolve(path);
        });
    });
}

function runRailsTests(path){
    return new Promise((resolve, reject) => {
        getProcess("rspec ./**/*_spec.rb").then(data => {
            console.log(`${data}`);
            resolve(path);
        }).catch(err => {
            console.log("rspec run test failed: ", err);
            resolve(path);
        });
    });
}

module.exports = runTests;