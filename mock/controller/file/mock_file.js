'use strict';

const utils = require('../../lib/utils');

module.exports = app => {
  app.post('/xapi/upload_file', function (req, res) {
    utils.checkParam(req.query, ["appId", "fileType"]);

    const appId = req.query.appId;
    const fileType = req.query.fileType;
    console.log('upload file appId:', appId, ', type:', fileType);

    setTimeout(() => res.send(JSON.stringify({ ok: true, data: { file: "u-abc" } })), 1000);
  });
};