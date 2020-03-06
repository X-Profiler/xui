'use strict';

const xprofiler = require('xprofiler');
xprofiler.start({
  patch_http: true
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser());

app.get('/xapi/user', function (req, res) {
  console.log('get user info');
  const data = {
    name: 'hyj1991'
  };
  res.send({ ok: true, data });
});

// console
require('./apps')(app);

// instance
require('./instance')(app);

// dashboard/instance/process
require("./mock_process")(app);

app.listen(7442);