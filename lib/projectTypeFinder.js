const projectTypes = require('./enums').projectTypes;
const Promise = require('bluebird');
const fs = require('fs');

function getProjectType(path){
    return new Promise((resolve, reject) => {
        process.chdir(path);
        if (isRails(path)){
            resolve({ path: path, projectType: projectTypes.Rails });
        }
    
        if (isNode(path)){
            resolve({ path: path, projectType: projectTypes.Javascript });
        }
    
        resolve({path: path, projectType: null});
    });
}

function isNode(path){
    try {
        var stats = fs.statSync(`package.json`);
        return true;
      }
      catch(err) {
          return false;
      }
}

function isRails(path){
    try {
        var stats = fs.statSync(`Gemfile`);
        return true;
      }
      catch(err) {
          return false;
      }
}

module.exports = getProjectType;