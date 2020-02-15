'use strict';

module.exports = app => {
  app.get('/xapi/agents', function (req, res) {
    const appId = req.query.appId;
    console.log(`get app ${appId} agents`);

    const list = new Array(20).fill('*').map(() => {
      return {
        agentId: `EZM_` + Math.random().toString(16).slice(2, 10)
      }
    })

    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });
};