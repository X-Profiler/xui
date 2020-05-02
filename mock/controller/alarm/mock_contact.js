'use strict';

const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/alarm_strategy_contacts', function (req, res) {
    utils.checkParam(req.query, ["strategyId"]);

    const strategyId = req.query.strategyId;
    console.log(`get strategy ${strategyId} contacts`);

    const data = require('../../data/contacts');

    setTimeout(() => res.send({ ok: true, data }), 550);
  });

  app.delete('/xapi/alarm_strategy_contact', function (req, res) {
    utils.checkParam(req.body, ["strategyId", "userId"]);

    const strategyId = req.body.strategyId;
    const userId = req.body.userId;
    console.log(`remove strategy ${strategyId} user ${userId}`);

    setTimeout(() => res.send({ ok: true }), 550);
  });

  app.post('/xapi/alarm_strategy_contact', function (req, res) {
    utils.checkParam(req.body, ["strategyId", "userId"]);

    const strategyId = req.body.strategyId;
    const userId = req.body.userId;
    console.log(`add strategy ${strategyId} user ${userId}`);

    setTimeout(() => res.send({ ok: true }), 550);
  });
};