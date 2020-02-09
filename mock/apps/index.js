'use strict';

const instanceMap = {};

function randomSetInstances() {
  for (var i = 1; i < 21; i++) {
    instanceMap[i] = {
      count: parseInt(Math.random() * 50)
    };
  }
}

randomSetInstances();
setInterval(randomSetInstances, 60 * 1000);

function randomInstance(instanceCount) {
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

  return list;
}

function getInstances(appId) {
  return instanceMap[appId];
}

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
      data[appId] = getInstances(appId).count;
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
      data[appId] = parseInt(Math.random() * 10e4)
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
    const instanceCount = getInstances(appId).count;
    // const instanceCount = 200;
    const list = randomInstance(instanceCount);

    setTimeout(() => res.send({ ok: true, data: { list } }), 500);
  });

  app.get('/xapi/overview/process_memory_usage', function (req, res) {
    const appId = req.query.appId;
    console.log(`get app ${appId} process memory usage overview`);

    // set data
    const instanceCount = getInstances(appId).count;
    // const instanceCount = 200;
    const list = randomInstance(instanceCount);

    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });

  app.get('/xapi/overview/system_cpu_usage', function (req, res) {
    const appId = req.query.appId;
    console.log(`get app ${appId} system cpu usage overview`);

    // set data
    const instanceCount = getInstances(appId).count;
    // const instanceCount = 200;
    const list = randomInstance(instanceCount);

    setTimeout(() => res.send({ ok: true, data: { list } }), 450);
  });

  app.get('/xapi/overview/disk_usage', function (req, res) {
    const appId = req.query.appId;
    console.log(`get app ${appId} disk usage overview`);

    // set data
    const instanceCount = getInstances(appId).count;
    // const instanceCount = 200;
    const list = randomInstance(instanceCount);

    setTimeout(() => res.send({ ok: true, data: { list } }), 450);
  });
};;