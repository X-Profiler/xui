'use strict';

const utils = require('../../lib/utils');

const appMap = {};
for (const app of require('../../data/myApps').concat(require('../../data/joinedApps'))) {
  appMap[app.appId] = app;
}

module.exports = app => {
  app.get('/xapi/settings', function (req, res) {
    utils.checkParam(req.query, ['appId']);

    const appId = req.query.appId;
    console.log(`get app ${appId} settings`);

    const data = {
      appId,
      name: appMap[appId].name,
      secret: 'c409fa23eae0d0589bf88205a27aa4a1'
    };

    setTimeout(() => res.send({ ok: true, data }), 600);
  });

  app.put('/xapi/settings_app_name', function (req, res) {
    utils.checkParam(req.body, ['appId', 'newAppName']);

    const appId = req.body.appId;
    const newAppName = req.body.newAppName;
    console.log(`modify app ${appId} new app name: ${newAppName}`);

    setTimeout(() => res.send({ ok: true }), 550);
  });

  app.delete('/xapi/settings_app', function (req, res) {
    utils.checkParam(req.body, ['appId']);

    const appId = req.body.appId;
    console.log(`delete app ${appId}`);

    setTimeout(() => res.send({ ok: true }), 550);
  });
};