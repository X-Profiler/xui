'use strict';

const utils = require('./utils');

module.exports = app => {
  app.get("/xapi/node_processes", function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} node processes.`);

    const list = require("./data/node_processes");

    setTimeout(() => res.send({ ok: true, data: { list } }), 600);
  });
};