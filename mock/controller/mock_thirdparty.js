'use strict';

const qs = require('querystring');

module.exports = app => {
  app.get('/public/speedscope/:file', function (req, res) {
    const url = req.path;
    res.redirect(url.replace('public', 'dashboard'));
  });

  app.get('/dashboard/speedscope', function (req, res) {
    // const url = req.path;
    const { fileId, fileType, fileName, downloadPath } = req.query;

    const query = {
      profileURL: encodeURIComponent(`${downloadPath}?fileType=${fileType}&fileId=${fileId}`),
      title: fileName
    };

    res.redirect(`/dashboard/speedscope/flamegraph.html?#${qs.stringify(query)}`);
  });
};