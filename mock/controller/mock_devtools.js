'use strict';

const path = require('path');
const qs = require('querystring');

module.exports = app => {
  //  the newest devtools
  app.get('/dashboard/devtools-new', function (req, res) {
    const query = req.query;
    query.fileName = path.basename(query.fileName);
    res.redirect(`/dashboard/devtools-new/devtools_app.html?${qs.stringify(req.query)}`);
  });

  //  the old devtools
  app.get('/dashboard/devtools-old', function (req, res) {
    const query = req.query;
    query.fileName = path.basename(query.fileName);
    res.redirect(`/dashboard/devtools-old/devtools_app.html?${qs.stringify(req.query)}`);
  });
};