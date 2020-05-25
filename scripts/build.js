"use strict";

const fs = require('fs');
const cp = require("child_process");
const path = require("path");

process.env.NODE_ENV = "production";

function exec(cmd) {
  console.log(cmd);
  const options = {
    cwd: path.join(__dirname, ".."),
    env: process.env,
    stdio: "inherit"
  };
  cp.execSync(cmd, options);
}

function createBaseDir(target) {
  if (!fs.existsSync(path.dirname(target))) {
    fs.mkdirSync(path.dirname(target), { recursive: true });
  }
}

function cleanOldTarget(target) {
  if (fs.existsSync(target)) {
    exec(`rm -rf ${target}`);
  }
}

function copyNewTarget(source, target) {
  exec(`cp -rf ${source} ${target}`);
}

// build vue
exec("vue-cli-service build");
exec("rm -rf ../xprofiler-console/app/view/index.html");
exec("mv dist/index.html ../xprofiler-console/app/view/");
exec("rm -rf ../xprofiler-console/app/public/*")
exec("mv dist/* ../xprofiler-console/app/public/");

// build devtools
const newDevtoolsSrc = path.join(__dirname, '../mock/public/dashboard/devtools-new');
const oldDevtoolsSrc = path.join(__dirname, '../mock/public/dashboard/devtools-old');
const newDevtoolsTarget = path.join(__dirname, '../../xprofiler-console/app/public/devtools/new');
const oldDevtoolsTarget = path.join(__dirname, '../../xprofiler-console/app/public/devtools/old');

createBaseDir(newDevtoolsTarget);
createBaseDir(oldDevtoolsTarget);

cleanOldTarget(newDevtoolsTarget);
cleanOldTarget(oldDevtoolsTarget);


copyNewTarget(newDevtoolsSrc, newDevtoolsTarget);
copyNewTarget(oldDevtoolsSrc, oldDevtoolsTarget);
