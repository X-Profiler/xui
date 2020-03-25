"use strict";

const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/agents', function (req, res) {
    utils.checkParam(req.query, ["appId"]);

    const appId = req.query.appId;
    console.log(`get app ${appId} agents`);

    const list = require('../../data/agents');

    // app.b = c;
    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });

  app.get('/xapi/agent', function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId}`);

    const list = [
      { type: "Node.js 版本", value: "v12.16.1" },
      { type: "Xtransit 版本", value: "xtransit@v1.0.0" },
      { type: "核心转储限制", value: "unlimited" },
      { type: "操作系统信息", value: "Linux/bbs-editor-web-bb66cfc56-rvzfh/linux/x64/3.10.0-957.21.3.el7.x86_64" }
    ];

    setTimeout(() => {
      // agentId.b = c;
      res.send({ ok: true, data: { list } })
    }, 550);
  });
};