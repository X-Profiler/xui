'use strict';

const path = require('path');
const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/module_files', function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} module files`);

    const path1 = `/Users/hyj1991/git/monitor/xui/package.json`;
    const path2 = `/Users/hyj1991/git/monitor/xprofiler/package.json`;

    const list = [
      {
        value: path1,
        label: path.basename(path1)
      },
      {
        value: path2,
        label: path.basename(path2)
      }
    ];

    setTimeout(() => res.send({ ok: true, data: { list } }), 500);
  });
};