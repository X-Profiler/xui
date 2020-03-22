'use strict';

const utils = require('./utils');

module.exports = app => {
  app.get('/xapi/system_overview', function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} system overview`);

    const data = {
      osCpu: 23,
      osMem: 67,
      maxDisk: 92,
      disks: {
        "/": 30,
        "/opt": 92,
        "/dev": 1
      },
      load1: 2.66,
      load5: 2.86,
      load15: 2.39,
      nodeCount: 8,
      scavengeMax: 105,
      scavengeAverage: 5,
      marksweepMax: 1001,
      marksweepAverage: 36,
      qps: 0.2,
      rtMax: 11298,
      rtAverage: 428
    };

    setTimeout(() => res.send({ ok: true, data }), 600);
  });
};