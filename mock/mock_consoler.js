'use strict';

const path = require('path');
const utils = require('./utils');

module.exports = app => {
  app.post('/xapi/app', function (req, res) {
    utils.checkParam(req.body, ["newAppName"]);

    const newAppName = req.body.newAppName;
    console.log(`create new app ${newAppName}`);

    const data = {
      appName: newAppName,
      appId: 1,
      appSecret: "3b33391b83631e369c5dfc85e7641109"
    }

    setTimeout(() => res.send({ ok: true, data }), 450);
  });

  // get apps
  app.get('/xapi/apps', function (req, res) {
    const type = req.query.type;
    console.log(`get apps type ${type}`);
    const list = require(path.join(__dirname, `./data/${type}.js`));
    setTimeout(() => res.send({ ok: true, data: { list } }), 500);
    // setTimeout(() => { res.send({ ok: false, message: "请求失败" }); }, 500);
  });
};