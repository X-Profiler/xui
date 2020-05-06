"use strict";

const cp = require("child_process");
const path = require("path");

function exec(cmd) {
  console.log(cmd);
  const options = {
    cwd: path.join(__dirname, ".."),
    env: process.env,
    stdio: "inherit"
  };
  cp.execSync(cmd, options);
}

exec("vue-cli-service build");
exec("rm -rf ../xprofiler-console/app/view/index.html");
exec("mv dist/index.html ../xprofiler-console/app/view/");
exec("rm -rf ../xprofiler-console/app/public/*")
exec("mv dist/* ../xprofiler-console/app/public/");
