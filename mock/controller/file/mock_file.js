'use strict';

const utils = require('../../lib/utils');

module.exports = app => {
  app.post('/xapi/upload_file', function (req, res) {
    utils.checkParam(req.query, ["appId", "fileType"]);

    const appId = req.query.appId;
    const fileType = req.query.fileType;
    console.log('upload file appId:', appId, ', type:', fileType);

    req.on('data', () => { });
    req.on('end', () => setTimeout(() => res.send({ ok: true, data: { file: "u-abc" } }), 1000));
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
    let files = list
      .filter(file => {
        if (filterType === "all") {
          return true;
        }

        if (filterType === "favor") {
          return file.favor;
        }

        return file.fileType === filterType;
      });
    const count = files.length;
    files = files.filter((...args) => args[1] >= start && args[1] < end);

    setTimeout(() => res.send({ ok: true, data: { list: files, count } }), 550);
  });

  app.post('/xapi/file_transfer', function (req, res) {
    utils.checkParam(req.body, ["fileId", "fileType"]);

    const fileId = req.body.fileId;
    const fileType = req.body.fileType;
    console.log(`transfer file ${fileId} type ${fileType}`);

    setTimeout(() => res.send({ ok: true }), 1000);
  });

  app.post('/xapi/file_favor', function (req, res) {
    utils.checkParam(req.body, ["fileId", "fileType", "favor"]);

    const fileId = req.body.fileId;
    const fileType = req.body.fileType;
    const favor = req.body.favor;
    console.log(`set file ${fileId} type ${fileType} favor: ${favor}`);

    setTimeout(() => res.send({ ok: true }), 500);
  });
};