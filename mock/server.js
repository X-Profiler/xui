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

// consoler
require('./controller/mock_consoler')(app);

// dashboard
require("./controller/mock_dashboard")(app);

// dashboard/instance
require("./controller/mock_instance")(app);

// dashboard/instance/process
require("./controller/mock_process")(app);

// dashboard/instance/system
require("./controller/mock_system")(app);

app.listen(7442);