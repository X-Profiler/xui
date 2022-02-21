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
      scavengeTotal: parseInt(Math.random() * 100) + 50,
      scavengeAverage: Number((Math.random() * 10).toFixed(1)),
      marksweepTotal: parseInt(Math.random() * 1000) + 500,
      marksweepAverage: parseInt(Math.random() * 50) + 10,
      qps: Number((Math.random() * 200).toFixed(1)),
      rtExpired: parseInt((Math.random() * 10)),
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
      extra = '4 Cores';
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
      list = utils.createAreaData(["scavenge_avg", "marksweep_avg", "total_gc_avg"], {
        cache: {
          scavenge_avg: 0,
          marksweep_avg: 0,
        },
        scavenge_avg: function () {
          const sca = parseInt(Math.random() * 20);
          this.cache.scavenge_avg = sca;
          return sca;
        },
        marksweep_avg: function () {
          const msa = 30 + parseInt(Math.random() * 20);
          this.cache.marksweep_avg = msa;
          return msa;
        },
        total_gc_avg: function () {
          return this.cache.scavenge_avg + this.cache.marksweep_avg;
        }
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
