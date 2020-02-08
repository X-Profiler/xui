'use strict';

module.exports = app => {
  app.get('/xapi/apps', function (req, res) {
    const type = req.query.type;
    console.log(`get apps type ${type}`);
    const data = require(`./${type}.json`);
    // setTimeout(() => res.send({ ok: true, data }), 500);
    res.send({ ok: true, data })
  });
};