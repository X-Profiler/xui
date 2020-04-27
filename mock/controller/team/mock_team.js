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
};