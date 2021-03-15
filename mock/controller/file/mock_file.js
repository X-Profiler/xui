'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('../../lib/utils');
const zlib = require('zlib');

const fileLoadingMap = {};

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
    list.forEach(file => file.basename = path.basename(file.file || file.coreFile));
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

  app.delete('/xapi/file_deletion', function (req, res) {
    utils.checkParam(req.body, ["fileId", "fileType"]);

    const fileId = req.body.fileId;
    const fileType = req.body.fileType;
    console.log(`delete file ${fileId} type ${fileType}`);

    setTimeout(() => res.send({ ok: true }), 500);
  });

  app.post('/xapi/file_status', function (req, res) {
    utils.checkParam(req.body, ["files"]);

    const files = req.body.files;
    console.log(`check ${JSON.stringify(files)} status`);

    const list = [];

    for (const { fileId, fileType, status, index } of files) {
      const key = `${fileId}::${fileType}`;
      if (!fileLoadingMap[key]) {
        fileLoadingMap[key] = { start: Date.now(), duration: 500 + Math.random() * 3000 };
      }

      if (Date.now() - fileLoadingMap[key].start > fileLoadingMap[key].duration) {
        list.push({ fileId, fileType, status: status + 1, index });
      } else {
        list.push({ fileId, fileType, status, index });
      }
    }

    setTimeout(() => res.send({ ok: true, data: { list } }), 500);
  });

  app.get('/file/download', function (req, res) {
    utils.checkParam(req.query, ["fileId", "fileType"]);

    const fileId = req.query.fileId;
    const fileType = req.query.fileType;
    console.log(`download fileType ${fileType} fileId ${fileId}`);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Disposition', `attachment;filename=x-test-profiler-21182-20190930-75431.${fileType}`);
    const tmp = path.join(__dirname, `../../data/profiler/mock.${fileType}`);

    setTimeout(() => {
      const gzip = zlib.createGzip();
      if (fs.existsSync(tmp)) {
        fs.createReadStream(tmp)
          .pipe(gzip)
          .on('error', err => console.error(new Error(`gzip file ${tmp} failed: ${err.message}`)))
          .pipe(res)
          .on('error', err => console.error(new Error(`pipe file ${tmp} failed: ${err.message}`)));
      } else {
        fs.createReadStream(__filename)
          .pipe(gzip)
          .on('error', err => console.error(new Error(`gzip file ${__filename} failed: ${err.message}`)))
          .pipe(res)
          .on('error', err => console.error(new Error(`pipe file ${__filename} failed: ${err.message}`)));
      }
    }, 1000);
  });
};