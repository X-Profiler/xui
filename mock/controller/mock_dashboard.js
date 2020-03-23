"use strict";

const utils = require('../lib/utils');

module.exports = app => {
  app.get('/xapi/app', function (req, res) {
    utils.checkParam(req.query, ["appId"]);

    const appId = req.query.appId;
    console.log(`get app ${appId} info`);

    let appName = '';
    if (Number(appId) === 1) {
      appName = 'Easy-Monitor';
    } else if (Number(appId) === 2) {
      appName = 'Xprofiler';
    } else if (Number(appId) - 2 < 10) {
      appName = `EZM-0${appId - 2}`;
    } else {
      appName = `EZM-${appId - 2}`;
    }

    const currentUserIsOwner = Number(appId) < 3;

    setTimeout(() => res.send({
      ok: true, data: { appName, currentUserIsOwner }
    }), 450);
  });
};