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

// consoler
require('./mock_consoler')(app);

// dashboard
require("./mock_dashboard")(app);

// dashboard/instance
require("./mock_instance")(app);

// dashboard/instance/process
require("./mock_process")(app);

// dashboard/instance/system
require("./mock_system")(app);

app.listen(7442);