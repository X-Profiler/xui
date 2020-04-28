'use strict';

const path = require('path');
const utils = require('../lib/utils');
const { randomInstance, getInstances } = require('../data/store');

module.exports = app => {
  // get app info
  app.post('/xapi/app', function (req, res) {
    utils.checkParam(req.body, ["newAppName"]);

    const newAppName = req.body.newAppName;
    console.log(`create new app ${newAppName}`);

    const data = {
      appName: newAppName,
      appId: 1,
      appSecret: "3b33391b83631e369c5dfc85e7641109"
    }

    setTimeout(() => res.send({ ok: true, data }), 450);
  });

  // get apps
  app.get('/xapi/apps', function (req, res) {
    utils.checkParam(req.query, ["type"]);

    const type = req.query.type;
    console.log(`get apps type ${type}`);
    const list = require(path.join(__dirname, `../data/${type}.js`));
    const invitations = [
      {
        appId: 100,
        appName: "EZM-100",
        ownerInfo: "TZ | 天猪"
      },
      {
        appId: 101,
        appName: "EZM-101",
        ownerInfo: "穆客"
      }
    ];
    setTimeout(() => res.send({ ok: true, data: { list, invitations } }), 500);
    // setTimeout(() => { res.send({ ok: false, message: "请求失败" }); }, 500);
  });

  // get overview metrics
  app.get('/xapi/overview_metrics', function (req, res) {
    utils.checkParam(req.query, ["appId"]);

    const appId = req.query.appId || [];
    console.log(`get overview metrics: ${appId}`);

    const data = {
      instanceCount: getInstances(appId).count,
      alarmCount: parseInt(Math.random() * 10e4),
      riskCount: parseInt(Math.random() * 100)
    };

    setTimeout(() => res.send({ ok: true, data }), 550);
  });

  app.get('/xapi/overview/process_cpu_usage', function (req, res) {
    utils.checkParam(req.query, ["appId"]);

    const appId = req.query.appId;
    console.log(`get app ${appId} process cpu usage overview`);

    // set data
    const instanceCount = getInstances(appId).count;
    // const instanceCount = 200;
    const list = randomInstance(instanceCount);

    setTimeout(() => res.send({ ok: true, data: { list } }), 500);
  });

  app.get('/xapi/overview/process_memory_usage', function (req, res) {
    utils.checkParam(req.query, ["appId"]);

    const appId = req.query.appId;
    console.log(`get app ${appId} process memory usage overview`);

    // set data
    const instanceCount = getInstances(appId).count;
    // const instanceCount = 200;
    const list = randomInstance(instanceCount);

    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });

  app.get('/xapi/overview/system_cpu_usage', function (req, res) {
    utils.checkParam(req.query, ["appId"]);

    const appId = req.query.appId;
    console.log(`get app ${appId} system cpu usage overview`);

    // set data
    const instanceCount = getInstances(appId).count;
    // const instanceCount = 200;
    const list = randomInstance(instanceCount);

    setTimeout(() => res.send({ ok: true, data: { list } }), 450);
  });

  app.get('/xapi/overview/system_memory_usage', function (req, res) {
    utils.checkParam(req.query, ["appId"]);

    const appId = req.query.appId;
    console.log(`get app ${appId} system cpu usage overview`);

    // set data
    const instanceCount = getInstances(appId).count;
    // const instanceCount = 200;
    const list = randomInstance(instanceCount);

    setTimeout(() => res.send({ ok: true, data: { list } }), 450);
  });

  app.get('/xapi/overview/disk_usage', function (req, res) {
    utils.checkParam(req.query, ["appId"]);

    const appId = req.query.appId;
    console.log(`get app ${appId} disk usage overview`);

    // set data
    const instanceCount = getInstances(appId).count;
    // const instanceCount = 200;
    const list = randomInstance(instanceCount);

    setTimeout(() => res.send({ ok: true, data: { list } }), 450);
  });
};