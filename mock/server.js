'use strict';

const path = require('path');

const xprofiler = require('xprofiler');
xprofiler.start({
  patch_http: true
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser());

app.get('/xapi/user', function (req, res) {
  console.log('get user info');
  const data = {
    name: 'hyj1991'
  };
  res.send({ ok: true, data });
});

// devtools
require('./controller/mock_devtools')(app);

// consoler
require('./controller/mock_consoler')(app);

// dashboard
require("./controller/mock_dashboard")(app);

// dashboard/instance
require("./controller/instance/mock_instance")(app);

// dashboard/instance/process
require("./controller/instance/mock_process")(app);

// dashboard/instance/system
require("./controller/instance/mock_system")(app);

// dashboard/instance/errors
require("./controller/instance/mock_errors")(app);

// dashboard/instance/modules
require("./controller/instance/mock_modules")(app);

// dashboard/file
require("./controller/file/mock_file")(app);

app.listen(7442);