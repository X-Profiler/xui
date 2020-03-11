'use strict';

const utils = require('./utils');

module.exports = app => {
  app.get('/xapi/xprofiler_processes', function (req, res) {
    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} pids`);

    const list = require('./data/xprocesses').map(proc => {
      proc.updateTime = Date.now() - 2 * 60 * 1000;
      if (proc.time === 'full') {
        proc.startTime = Date.now() - 24 * 60 * 60 * 1000;
      }
      if (proc.time === 'half') {
        proc.startTime = Date.now() - 12 * 60 * 60 * 1000;
      }
      if (proc.time === 'pre') {
        proc.startTime = Date.now() - 16 * 60 * 60 * 1000;
        proc.updateTime = Date.now() - 8 * 60 * 60 * 1000;
      }

      // add cpu usage
      proc.cpuUsage = (Math.random() * 100).toFixed(2);

      // add heap memory usage
      proc.heapUsage = (Math.random() * 100).toFixed(2);

      // add gc
      proc.gcUsage = (Math.random() * 100).toFixed(2);

      // add rss
      proc.rss = parseInt(Math.random() * 1024 * 1024 * 1024 * 2);

      // add libuv active handles
      proc.uvHandles = 1 + parseInt(Math.random() * 4000);

      // add timers
      proc.timers = 1 + parseInt(Math.random() * 200);

      // add tcp handles
      proc.tcpHandles = parseInt(Math.random() * 3800);

      // add udp handles
      proc.udpHandles = parseInt(Math.random() * 100);

      return proc;
    });
    // agentId.Number = c
    setTimeout(() => res.send({ ok: true, data: { list } }), 450);
  });

  app.get("/xapi/node_processes", function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    console.log(`get app ${appId} agent ${agentId} node processes.`);

    const list = require("./data/node_processes");

    setTimeout(() => res.send({ ok: true, data: { list } }), 600);
  });

  app.get("/xapi/xprofiler_status", function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId", "pid"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    const pid = Number(req.query.pid);
    console.log(`get app ${appId} agent ${agentId} pid ${pid}'s xprofiler status.`);

    let data;

    if ([12623].includes(pid)) {
      data = {
        installXprofiler: true,
        enableXprofiler: true,
        xprofilerLogdir: "/var/folders/rw/g1t4bp_x2_n0dwk_82xx_0vh0000gn/T",
        xtransitLogdir: "/var/folders/rw/g1t4bp_x2_n0dwk_82xx_0vh0000gn/T",
        nodeVersion: "v12.16.1",
        xprofilerVersion: "v1.2.2",
        xprofilerConfig: {
          enable_fatal_error_hook: true,
          enable_log_uv_handles: true,
          patch_http: false,
          patch_http_timeout: 30,
          log_interval: 60,
          log_level: 1,
        }
      }
    } else if ([2986].includes(pid)) {
      data = {
        installXprofiler: false,
        nodeVersion: "v12.16.1",
      }
    } else if ([4908].includes(pid)) {
      data = {
        installXprofiler: true,
        enableXprofiler: false,
        nodeVersion: "v12.16.1"
      }
    } else if ([6578].includes(pid)) {
      data = {
        installXprofiler: true,
        enableXprofiler: true,
        xprofilerLogdir: "/var/folders/rw/g1t4bp_x2_n0dwk_82xx_0vh0000gn/T",
        xtransitLogdir: "/tmp",
        nodeVersion: "v12.16.1",
        xprofilerVersion: "v1.2.2",
        xprofilerConfig: {
          enable_fatal_error_hook: true,
          enable_log_uv_handles: true,
          patch_http: false,
          patch_http_timeout: 30,
          log_interval: 60,
          log_level: 1,
        }
      }
    } else {
      data = {
        installXprofiler: true,
        enableXprofiler: false,
        nodeVersion: "v12.16.1"
      }
    }

    // agentId.b = c;
    setTimeout(() => res.send({ ok: true, data }), 600);
  });

  app.get("/xapi/process_trend", function (req, res) {
    utils.checkParam(req.query, ["appId", "agentId", "pid", "trendType"]);

    const appId = req.query.appId;
    const agentId = req.query.agentId;
    const pid = Number(req.query.pid);
    const trendType = req.query.trendType;
    console.log(`get app ${appId} agent ${agentId} pid ${pid} trend ${trendType} data`);

    let list = [];

    if (trendType === 'heapTrend') {
      list = utils.createAreaData(["rss", "heap_total", "heap_used"], {
        rss: () => (300 + parseInt(Math.random() * 50)) * 1024 * 1204,
        heap_total: () => (200 + parseInt(Math.random() * 50)) * 1024 * 1204,
        heap_used: () => (150 + parseInt(Math.random() * 50)) * 1024 * 1204
      })
    }

    // agentId.Number = c;

    setTimeout(() => res.send({ ok: true, data: { list } }), 1000);
  });
};