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

app.get('/xapi/apps', function (req, res) {
  console.log(`get apps type ${req.query.type}`);
  const data = [{}];
  // setTimeout(() => res.send({ ok: true, data }), 500);
  res.send({ ok: true, data })
});

app.listen(7442);