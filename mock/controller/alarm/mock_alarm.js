'use strict';

const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/alarm_strategies', function (req, res) {
    utils.checkParam(req.query, ["appId"]);

    const appId = req.query.appId;
    console.log(`get app ${appId} alarm strategies`);

    const list = [
      {
        strategyId: 1,
        contextType: 'xprofiler_log',
        pushType: 'p3',
        expression: '@cpu_60 > 90',
        alarmContent: '1 分钟内 CPU 使用率超过 90%，当前为 ${@cpu_60}%',
        status: 1,
        alarmCount: 666
      },
      {
        strategyId: 2,
        contextType: 'xprofiler_log',
        pushType: 'p3',
        expression: '@heap_used / @heap_limit > 0.7',
        alarmContent: '已用堆内存超过堆上限的 70%，当前为 ${@heap_used / @heap_limit * 100}%',
        status: 0,
        alarmCount: 0
      },
      {
        strategyId: 3,
        contextType: 'system_log',
        pushType: 'p3',
        expression: '@disk_usage > 85',
        alarmContent: '磁盘 (${@mounted_on}) 占比超过 85%：为 ${@disk_usage}%',
        status: 1,
        alarmCount: 520
      }
    ];

    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });

  app.post("/xapi/alarm_strategy", function (req, res) {
    utils.checkParam(req.body, ["appId", "contextType", "pushType",
      "customRuleExpr", "customRuleDesc", "webhookPush"]);

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

  app.put("/xapi/alarm_strategy", function (req, res) {
    utils.checkParam(req.body, ["strategyId", "contextType", "pushType",
      "customRuleExpr", "customRuleDesc", "webhookPush"]);

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

  app.delete("/xapi/alarm_strategy", function (req, res) {
    utils.checkParam(req.body, ["strategyId"]);

    const strategyId = req.body.strategyId;
    console.log(`delete stratrgy ${strategyId}`);

    setTimeout(() => res.send({ ok: true }), 550);
  });

  app.put("/xapi/alarm_strategy_status", function (req, res) {
    utils.checkParam(req.body, ["strategyId", "status"]);

    const strategyId = req.body.strategyId;
    const status = req.body.status;
    console.log(`update stratrgy ${strategyId} status ${status}`);

    setTimeout(() => res.send({ ok: true }), 550);
  });
};