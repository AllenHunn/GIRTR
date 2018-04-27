const Promise = require('bluebird');
const getProcess = require('./asyncProcess').getProcessAsync;
const projectTypes = require('./enums').projectTypes;

async function runInstaller(path, projectType){
    return new Promise((resolve, reject) => {
        console.log("Installing dependencies, this may take a while...");
        switch(projectType){
            case projectTypes.Javascript:
                npmInstall(path)
                    .then(() => resolve({path: path, projectType: projectType}))
                    .catch((err) => reject(err));
                break;
            case projectTypes.Rails:
                bundleInstall(path)
                    .then(() => resolve({path: path, projectType: projectType}))
                    .catch((err) => reject(err));
                break;
            default:
                reject("invalid project type");
                break;
        }   
    });
}

function npmInstall(path){
    return new Promise((resolve, reject) => {
        getProcess(`npm install --prefix ${path}`).then(data => {
            console.log(`${data}`);
            resolve(path);
        }).catch(err => {
            console.log("npm install failed: ", err);
            reject(err);
        });
    });
}

function bundleInstall(path){
    return new Promise((resolve, reject) => {
        getProcess(`bundle install`).then(data => {
            console.log(`${data}`);
            resolve(path);
        }).catch(err => {
            console.log("bundle install failed: ", err);
            reject(err);
        });
    });
}

module.exports = runInstaller;