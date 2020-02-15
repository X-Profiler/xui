'use strict';

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

app.listen(7442);