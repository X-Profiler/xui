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

    const list = require('./pids.json').map(pid => {
      pid.endTime = Date.now();
      if (pid.time === 'full') {
        pid.startTime = Date.now() - 24 * 60 * 60 * 1000;
      }
      if (pid.time === 'half') {
        pid.startTime = Date.now() - 12 * 60 * 60 * 1000;
      }
      return pid;
    });
    setTimeout(() => res.send({ ok: true, data: { list } }), 450);
  });
};