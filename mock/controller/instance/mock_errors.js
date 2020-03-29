'use strict';

const path = require('path');
const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/error_files', function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} error logs`);

    const path1 = `/Users/hyj1991/git/suning/xui/logs/xui/common-${Math.random().toString(16).slice(2, 8)}-error.log`;
    const path2 = `/Users/hyj1991/git/suning/xprofiler/logs/xprofiler/xprofiler-${Math.random().toString(16).slice(2, 8)}-error.log`;

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

  app.get('/xapi/error_logs', function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId", "errorFile", "currentPage", "pageSize"]);
    const appId = req.query.appId;
    const agentId = req.query.agentId;
    const errorFile = req.query.errorFile;
    const currentPage = req.query.currentPage;
    const pageSize = req.query.pageSize;
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    console.log(`get app ${appId} agent ${agentId}: ${errorFile} (${start} ~ ${end}) <${pageSize}>`);

    const list = require('../../data/erros');
    const logs = list.filter((...args) => args[1] >= start && args[1] < end);

    setTimeout(() => res.send({ ok: true, data: { list: logs, count: list.length } }), 550);
  });
};