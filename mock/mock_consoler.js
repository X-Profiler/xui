'use strict';

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
};