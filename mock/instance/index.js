'use strict';

module.exports = app => {
  app.get('/xapi/agents', function (req, res) {
    const appId = req.query.appId;
    console.log(`get app ${appId} agents`);

    const list = require('./agents.json');

    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });

  app.get('/xapi/agent', function (req, res) {
    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId}`);

    const list = [{ type: "Node.js 版本", value: "v12.16.1" }, {
      type: "Xtransit 版本", value: "v1.0.0"
    }, {
      type: "核心转储限制", value: "unlimited"
    }, {
      type: "操作系统信息", value: "Linux/bbs-editor-web-bb66cfc56-rvzfh/linux/x64/3.10.0-957.21.3.el7.x86_64"
    }];

    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });

  app.get('/xapi/x_processes', function (req, res) {
    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} pids`);

    const list = require('./xprocesses.json').map(proc => {
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
};