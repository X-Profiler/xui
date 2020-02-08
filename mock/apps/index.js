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
};;