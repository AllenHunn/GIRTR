var ArgumentParser = require('argparse').ArgumentParser;
const gitPuller = require('./gitPuller');
const runTests = require('./testRunner');
const runInstaller = require('./installer');
const getProjectType = require('./projectTypeFinder');
const run = require('./runner');

var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Git -> Install -> Run Tests -> Run MAKE GRADING FUN'
});

parser.addArgument(
  [ 'gitUrl' ],
  {
    help: 'girtr <git path>'
  }
);

parser.addArgument(['-b', '--branch'], 
{
    help: '--b <branch name>',
    defaultValue: 'master',
    required: false
});

var args = parser.parseArgs();

gitPuller(args.gitUrl, args.branch)
    .then((path) => getProjectType(path))
    .then((values) => runInstaller(values.path, values.projectType))
    .then((values) => runTests(values.path, values.projectType))
    .then((values) => run(values.path, values.projectType));