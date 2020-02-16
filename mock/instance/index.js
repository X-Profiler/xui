'use strict';

module.exports = app => {
  app.get('/xapi/agents', function (req, res) {
    const appId = req.query.appId;
    console.log(`get app ${appId} agents`);

    const list = require('./agents.json');

    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });
};