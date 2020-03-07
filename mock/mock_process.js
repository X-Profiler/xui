'use strict';

const utils = require('./utils');

module.exports = app => {
  app.get('/xapi/xprofiler_processes', function (req, res) {
    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} pids`);

    const list = require('./data/xprocesses').map(proc => {
      proc.updateTime = Date.now() - 2 * 60 * 1000;
      if (proc.time === 'full') {
        proc.startTime = Date.now() - 24 * 60 * 60 * 1000;
      }
      if (proc.time === 'half') {
        proc.startTime = Date.now() - 12 * 60 * 60 * 1000;
      }
      if (proc.time === 'pre') {
        proc.startTime = Date.now() - 16 * 60 * 60 * 1000;
        proc.updateTime = Date.now() - 8 * 60 * 60 * 1000;
      }

      // add cpu usage
      proc.cpuUsage = (Math.random() * 100).toFixed(2);

      // add heap memory usage
      proc.heapUsage = (Math.random() * 100).toFixed(2);

      // add gc
      proc.gcUsage = (Math.random() * 100).toFixed(2);

      // add rss
      proc.rss = parseInt(Math.random() * 1024 * 1024 * 1024 * 2);

      // add libuv active handles
      proc.uvHandles = 1 + parseInt(Math.random() * 4000);

      // add timers
      proc.timers = 1 + parseInt(Math.random() * 200);

      // add tcp handles
      proc.tcpHandles = parseInt(Math.random() * 3800);

      // add udp handles
      proc.udpHandles = parseInt(Math.random() * 100);

      return proc;
    });
    setTimeout(() => res.send({ ok: true, data: { list } }), 450);
  });

  app.get("/xapi/node_processes", function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} node processes.`);

    const list = require("./data/node_processes");

    setTimeout(() => res.send({ ok: true, data: { list } }), 600);
  });
};