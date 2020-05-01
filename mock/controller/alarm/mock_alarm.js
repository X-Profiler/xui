'use strict';

const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/alarm_strategies', function (req, res) {
    utils.checkParam(req.query, ['appId']);

    const appId = req.query.appId;
    console.log(`get app ${appId} alarm strategies`);

    const list = require('../../data/rules');

    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });

  app.post('/xapi/alarm_strategy', function (req, res) {
    utils.checkParam(req.body, ['appId', 'contextType', 'pushType',
      'customRuleExpr', 'customRuleDesc', 'webhookPush']);

    const appId = req.body.appId;
    const contextType = req.body.contextType;
    const customRuleExpr = req.body.customRuleExpr;
    const customRuleDesc = req.body.customRuleDesc;
    const webhookPush = req.body.webhookPush;
    const webhookType = req.body.webhookType;
    const webhookAddress = req.body.webhookAddress;
    const webhookSign = req.body.webhookSign;
    console.log(`add app ${appId} strategy [${contextType}] [${customRuleExpr}] `
      + `[${customRuleDesc}] [${webhookPush}] `
      + `(webhookType ${webhookType} webhookAddress ${webhookAddress} webhookSign ${webhookSign})`);

    setTimeout(() => res.send({ ok: true }), 550);
    // res.send({ ok: true })
  });

  app.put('/xapi/alarm_strategy', function (req, res) {
    utils.checkParam(req.body, ['strategyId', 'contextType', 'pushType',
      'customRuleExpr', 'customRuleDesc', 'webhookPush']);

    const strategyId = req.body.strategyId;
    const contextType = req.body.contextType;
    const customRuleExpr = req.body.customRuleExpr;
    const customRuleDesc = req.body.customRuleDesc;
    const webhookPush = req.body.webhookPush;
    const webhookType = req.body.webhookType;
    const webhookAddress = req.body.webhookAddress;
    const webhookSign = req.body.webhookSign;
    console.log(`update strategy [${strategyId}] [${contextType}] [${customRuleExpr}] `
      + `[${customRuleDesc}] [${webhookPush}] `
      + `(webhookType ${webhookType} webhookAddress ${webhookAddress} webhookSign ${webhookSign})`);

    setTimeout(() => res.send({ ok: true }), 550);
    // res.send({ ok: true })
  });

  app.delete('/xapi/alarm_strategy', function (req, res) {
    utils.checkParam(req.body, ['strategyId']);

    const strategyId = req.body.strategyId;
    console.log(`delete stratrgy ${strategyId}`);

    setTimeout(() => res.send({ ok: true }), 550);
  });

  app.put('/xapi/alarm_strategy_status', function (req, res) {
    utils.checkParam(req.body, ['strategyId', 'status']);

    const strategyId = req.body.strategyId;
    const status = req.body.status;
    console.log(`update stratrgy ${strategyId} status ${status}`);

    setTimeout(() => res.send({ ok: true }), 550);
  });

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