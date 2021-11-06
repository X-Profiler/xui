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
    name: 'hyj1991',
    id: 19153670
  };
  res.send({ ok: true, data });
});

// devtools
require('./controller/mock_devtools')(app);

// consoler
require('./controller/mock_consoler')(app);

// dashboard
require('./controller/mock_dashboard')(app);

// dashboard/instance
require('./controller/instance/mock_instance')(app);

// dashboard/instance/process
require('./controller/instance/mock_process')(app);

// dashboard/instance/system
require('./controller/instance/mock_system')(app);

// dashboard/instance/errors
require('./controller/instance/mock_errors')(app);

// dashboard/instance/modules
require('./controller/instance/mock_modules')(app);

// dashboard/file
require('./controller/file/mock_file')(app);

// dashboard/team
require('./controller/team/mock_team')(app);

// dashboard/alarm
require('./controller/alarm/mock_alarm')(app);

// dashboard/alarm/contact
require('./controller/alarm/mock_contact')(app);

// dashboard/alarm/history
require('./controller/alarm/mock_history')(app);

// dashboard/settings
require('./controller/setting/mock_settings')(app);

app.listen(7442);
