'use strict';

module.exports = app => {
  // get apps
  app.get('/xapi/apps', function (req, res) {
    const type = req.query.type;
    console.log(`get apps type ${type}`);
    const data = require(`./${type}.json`);
    setTimeout(() => res.send({ ok: true, data }), 300);
    // res.send({ ok: true, data })
  });

  // get instance count
  app.get('/xapi/instance_count', function (req, res) {
    const appIds = req.query.appIds;
    console.log(`get instance count: ${JSON.stringify(appIds)}`);
    const data = {};
    for (const appId of appIds) {
      data[appId] = parseInt(Math.random() * 200)
    }
    setTimeout(() => res.send({ ok: true, data }), 100);
    // res.send({ ok: true, data });
  });

  // get alarm count
  app.get('/xapi/alarm_count', function (req, res) {
    const appIds = req.query.appIds;
    console.log(`get alarm count: ${JSON.stringify(appIds)}`);
    const data = {};
    for (const appId of appIds) {
      data[appId] = parseInt(Math.random() * 10e5)
    }
    setTimeout(() => res.send({ ok: true, data }), 500);
    // res.send({ ok: true, data });
  });

  // get risk count
  app.get('/xapi/risk_count', function (req, res) {
    const appIds = req.query.appIds;
    console.log(`get risk count: ${JSON.stringify(appIds)}`);
    const data = {};
    for (const appId of appIds) {
      data[appId] = parseInt(Math.random() * 100)
    }
    setTimeout(() => res.send({ ok: true, data }), 300);
    // res.send({ ok: true, data });
  });

  // get cpu usage overview
  app.get('/xapi/overview/process_cpu_usage', function (req, res) {
    const appId = req.query.appId;
    console.log(`get app ${appId} process cpu usage overview`);
    // set data
    const instanceCount = parseInt(Math.random() * 50);
    // const instanceCount = 200;
    // 0: no data, 1 healthy, 2 warning, 3 errored
    const list = new Array(instanceCount).fill('*').map(() => ({ status: 1 }));

    // set no data
    const noDataIndex = parseInt(Math.random() * instanceCount);
    list[noDataIndex] && (list[noDataIndex].status = 0);

    // set warning
    const warningIndex = parseInt(Math.random() * instanceCount);
    list[warningIndex] && (list[warningIndex].status = 2);

    // set error
    const errorIndex = parseInt(Math.random() * instanceCount);
    list[errorIndex] && (list[errorIndex].status = 3);
    setTimeout(() => res.send({ ok: true, data: { list } }), 500);
  });
};;