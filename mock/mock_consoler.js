'use strict';

const utils = require('./utils');

module.exports = app => {
  app.post('/xapi/app', function (req, res) {
    utils.checkParam(req.body, ["newAppName"]);

    const newAppName = req.body.newAppName;
    console.log(`create new app ${newAppName}`);

    setTimeout(() => res.send({ ok: true }), 450);
  });
};