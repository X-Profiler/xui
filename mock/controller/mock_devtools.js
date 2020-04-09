'use strict';

module.exports = app => {
  //  the newest devtools
  app.get('/dashboard/devtools-new', function (req, res) {
    res.redirect('/dashboard/devtools-new/devtools_app.html');
  });
};