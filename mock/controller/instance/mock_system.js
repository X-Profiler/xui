'use strict';

const utils = require('../../lib/utils');

module.exports = app => {
  app.get('/xapi/system_overview', function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} system overview`);

    const data = {
      osCpu: 23,
      osMem: 67,
      maxDisk: 92,
      disks: {
        "/": 30,
        "/opt": 92,
        "/dev": 1
      },
      load1: Number((Math.random() * 4).toFixed(2)),
      load5: Number((Math.random() * 4).toFixed(2)),
      load15: Number((Math.random() * 4).toFixed(2)),
      nodeCount: 8,
      scavengeMax: parseInt(Math.random() * 100) + 50,
      scavengeAverage: Number((Math.random() * 10).toFixed(1)),
      marksweepMax: parseInt(Math.random() * 1000) + 500,
      marksweepAverage: parseInt(Math.random() * 50) + 10,
      qps: Number((Math.random() * 200).toFixed(1)),
      rtMax: parseInt((Math.random() * 600)) + 5000,
      rtAverage: parseInt((Math.random() * 200)) + 200
    };

    setTimeout(() => res.send({ ok: true, data }), 600);
  });

  app.get('/xapi/system_trend', function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId", "trendType"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    const trendType = req.query.trendType;
    const duration = req.query.duration;
    console.log(`get app ${appId} agent ${agentId} system trend ${trendType} data: ${duration}h`);

    let list = [];
    let extra = undefined;
    let yAxis = undefined;

    if (trendType === 'osCpuTrend') {
      list = utils.createAreaData(["os_cpu"], {
        os_cpu: () => 40 + parseInt(Math.random() * 10)
      }, duration);
    }

    if (trendType === 'osMemoryTrend') {
      list = utils.createAreaData(["os_memory"], {
        os_memory: () => 80 + parseInt(Math.random() * 10),
      }, duration);
      extra = `16 GB`;
    }

    if (trendType === 'loadTrend') {
      list = utils.createAreaData(["load1", "load5", "load15"], {
        load1: () => Number((4 + Math.random() * 4).toFixed(2)),
        load5: () => Number((4 + Math.random() * 2).toFixed(2)),
        load15: () => Number((4 + Math.random() * 1).toFixed(2))
      }, duration);
    }

    if (trendType === "nodeCountTrend") {
      list = utils.createAreaData(["node_count"], {
        node_count: () => 8,
      }, duration);
    }

    if (trendType === "osGcTrend") {
      list = utils.createAreaData(["scavenge_avg", "marksweep_avg"], {
        scavenge_avg: () => parseInt(Math.random() * 20),
        marksweep_avg: () => 30 + parseInt(Math.random() * 20)
      }, duration);
    }

    if (trendType === "diskUsageTrend") {
      yAxis = ["/", "/opt", "/data"];
      list = utils.createAreaData(yAxis, {
        ...yAxis.reduce((res, axis, index) => {
          res[axis] = () => 40 + index * 20 + parseInt(Math.random() * 5);
          return res;
        }, {})
      }, duration);
    }

    if (trendType === "qpsTrend") {
      list = utils.createAreaData(["qps"], {
        qps: () => 200 + Number((Math.random() * 50).toFixed(1))
      }, duration);
    }

    if (trendType === "httpResponseTrend") {
      list = utils.createAreaData(["response_time"], {
        response_time: () => parseInt((Math.random() * 100)) + 200
      }, duration);
    }

    setTimeout(() => res.send({ ok: true, data: { list, extra, yAxis } }), 500);
  });
};