'use strcit';

const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/alarm_strategy_history', function (req, res) {
    utils.checkParam(req.query, ["strategyId", "currentPage", "pageSize"]);

    const strategyId = req.query.strategyId
    const currentPage = req.query.currentPage;
    const pageSize = req.query.pageSize;
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    console.log(`get startegy ${strategyId} history (${start} ~ ${end}) <${pageSize}>`);

    const history = [];

    setTimeout(() => res.send({ ok: true, data: { list: history, count: history.length } }), 650);
  });
};