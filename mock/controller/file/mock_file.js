'use strict';

const utils = require('../../lib/utils');

module.exports = app => {
  app.post('/xapi/upload_file', function (req, res) {
    utils.checkParam(req.query, ["appId", "fileType"]);

    const appId = req.query.appId;
    const fileType = req.query.fileType;
    console.log('upload file appId:', appId, ', type:', fileType);

    setTimeout(() => res.send({ ok: true, data: { file: "u-abc" } }), 1000);
  });

  app.get('/xapi/files', function (req, res) {
    utils.checkParam(req.query, ["appId", "filterType", "currentPage", "pageSize"]);

    const appId = req.query.appId;
    const filterType = req.query.filterType;
    const currentPage = req.query.currentPage;
    const pageSize = req.query.pageSize;
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    console.log(`get app ${appId} files: ${filterType} (${start} ~ ${end}) <${pageSize}>`);

    const list = require('../../data/files');

    setTimeout(() => res.send({ ok: true, data: { list } }), 550);
  });
};