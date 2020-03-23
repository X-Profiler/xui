'use strict';

const { getInstances } = require('../data/store');

module.exports = app => {
  // get instance count
  app.get('/xapi/instance_count', function (req, res) {
    const appIds = req.query.appIds || [];
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
    const appIds = req.query.appIds || [];
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
    const appIds = req.query.appIds || [];
    console.log(`get risk count: ${JSON.stringify(appIds)}`);
    const data = {};
    for (const appId of appIds) {
      data[appId] = parseInt(Math.random() * 100)
    }
    setTimeout(() => res.send({ ok: true, data }), 300);
    // res.send({ ok: true, data });
  });

};;