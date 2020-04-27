'use strict';

const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/team_members', function (req, res) {
    utils.checkParam(req.query, ["appId"]);

    const appId = req.query.appId;
    console.log(`get app ${appId} team members`);

    // member status: 0 admin, 1 inviting, 2 joined
    const list = [
      {
        userId: 1,
        userInfo: 'hyj1991',
        status: 0,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 33
      },
      {
        userId: 2,
        userInfo: 'TZ | 天猪',
        status: 2,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 25
      },
      {
        userId: 3,
        userInfo: '朴灵',
        status: 1,
        timestamp: Date.now()
      },
      {
        userId: 4,
        userInfo: '普冬',
        status: 2,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3
      },
      {
        userId: 5,
        userInfo: '穆客',
        status: 1,
        timestamp: Date.now() - 1000 * 60 * 60 * 24
      },
      {
        userId: 6,
        userInfo: '洗影',
        status: 2,
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 8
      },
    ];

    const currentUserId = 1;

    setTimeout(() => res.send({ ok: true, data: { list, currentUserId } }), 450);
  });

  app.post('/xapi/team_member', function (req, res) {
    utils.checkParam(req.body, ["appId", "userId", "status"]);

    const appId = req.body.appId;
    const userId = req.body.userId;
    const status = req.body.status;
    console.log(`update app ${appId} member ${userId} status ${status}`);

    setTimeout(() => res.send({ ok: true }), 450);
  });

  app.delete('/xapi/team_member', function (req, res) {
    utils.checkParam(req.body, ["appId", "userId"]);

    const appId = req.body.appId;
    const userId = req.body.userId;
    console.log(`delete app ${appId} member ${userId}`);

    setTimeout(() => res.send({ ok: true }), 450);
  });
};