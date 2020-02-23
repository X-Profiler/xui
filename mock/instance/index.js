'use strict';

module.exports = app => {
  app.get('/xapi/agents', function (req, res) {
    const appId = req.query.appId;
    console.log(`get app ${appId} agents`);

    const list = require('./agents.json');

    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });

  app.get('/xapi/x_processes', function (req, res) {
    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} pids`);

    const list = require('./xprocesses.json').map(proc => {
      proc.updateTime = Date.now();
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

      return proc;
    });
    setTimeout(() => res.send({ ok: true, data: { list } }), 450);
  });
};