const getProcess = require('./asyncProcess').getProcessAsync;
const Promise = require('bluebird');

function gitPull(gitUrl, gitBranch){
    const urlArray = gitUrl.split('/');
    const repoName = urlArray.pop();
    const userName = urlArray.pop();
    const path = `./${userName}/${repoName}`;

    return new Promise((resolve, reject) => {
        getProcess(`git clone ${gitUrl} ${path}`).then(data => {
            console.log(`${data}`);
            getProcess(`git -C ${path} checkout ${gitBranch}`).then(data => {
                console.log(`${data}`);
                resolve(path);
            }).catch(err => {
                console.log("git checkout failed: ", err);
                reject(err);
            });
        }).catch(err => {
            console.log("git clone failed: ", err);
            reject(err);
        });
    });
}

module.exports = gitPull;