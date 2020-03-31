'use strict';
const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/module_files', function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} module files`);

    const list = require('../../data/module/risks');

    setTimeout(() => res.send({ ok: true, data: { list } }), 500);
  });

  app.get('/xapi/module', function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId", "moduleFile"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    const moduleFile = req.query.moduleFile;
    console.log(`get app ${appId} agent ${agentId} module file ${moduleFile}`);

    const data = require('../../data/module/module');
    data.file = moduleFile;

    setTimeout(() => res.send({ ok: true, data }), 500);
  });
};