'use strict';

const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/error_files', function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId"]);

    const list = [
      {
        value: '/Users/hyj1991/git/suning/xui/logs/xui/common-error.log',
        label: 'common-error.log'
      },
      {
        value: '/Users/hyj1991/git/suning/xprofiler/logs/xprofiler/common-error.log',
        label: 'xprofiler-common-error.log'
      }
    ];

    setTimeout(() => res.send({ ok: true, data: { list } }), 600);
  });
};