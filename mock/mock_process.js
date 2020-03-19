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

    if ([6011].includes(pid)) {
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
    } else if ([6024].includes(pid)) {
      data = {
        installXprofiler: false,
        nodeVersion: "v12.16.1",
      }
    } else if ([6025].includes(pid)) {
      data = {
        installXprofiler: true,
        enableXprofiler: false,
        nodeVersion: "v12.16.1"
      }
    } else if ([6027].includes(pid)) {
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
    let limit = 0;

    if (trendType === 'heapTrend') {
      list = utils.createAreaData(["rss", "heap_total", "heap_used"], {
        rss: () => (300 + parseInt(Math.random() * 50)) * 1024 * 1204,
        heap_total: () => (200 + parseInt(Math.random() * 50)) * 1024 * 1204,
        heap_used: () => (150 + parseInt(Math.random() * 50)) * 1024 * 1204
      });
      limit = 2 * 1024 * 1024 * 1024;
    }

    if (trendType === 'cpuTrend') {
      list = utils.createAreaData(["cpu_now", "cpu_15", "cpu_30", "cpu_60"], {
        cpu_now: () => 50 + parseInt(Math.random() * 40),
        cpu_15: () => 50 + parseInt(Math.random() * 30),
        cpu_30: () => 50 + parseInt(Math.random() * 20),
        cpu_60: () => 50 + parseInt(Math.random() * 10)
      });
    }

    if (trendType === 'heapSpaceTrend') {
      list = utils.createAreaData(["new_space", "old_space", "code_space", "map_space",
        "lo_space", "read_only_space", "new_lo_space", "code_lo_space"], {
        old_space: () => (200 + parseInt(Math.random() * 50)) * 1024 * 1204,
        new_space: () => (25 + parseInt(Math.random() * 10)) * 1024 * 1204,
        code_space: () => 30 * 1024 * 1204,
        map_space: () => 30 * 1024 * 1204,
        lo_space: () => 30 * 1024 * 1204,
        read_only_space: () => 30 * 1024 * 1204,
        new_lo_space: () => 30 * 1024 * 1204,
        code_lo_space: () => 30 * 1024 * 1204
      });
    }

    if (trendType === 'gcTrend') {
      list = utils.createAreaData(["scavenge_duration", "marksweep_duration"], {
        scavenge_duration: () => parseInt(Math.random() * 20),
        marksweep_duration: () => parseInt(Math.random() * 30)
      });
    }

    if (trendType === 'uvTrend') {
      list = utils.createAreaData(["active_handles"], {
        active_handles: () => 2400 + parseInt(Math.random() * 600),
      });
    }

    if (trendType === 'qpsTrend') {
      list = utils.createAreaData(["qps"], {
        qps: () => 1 + Number((Math.random() * 0.3).toFixed(2))
      });
    }

    if (trendType === 'timerTrend') {
      list = utils.createAreaData(["active_timers"], {
        active_timers: () => 200 + parseInt(Math.random() * 100),
      });
    }

    if (trendType === 'tcpTrend') {
      list = utils.createAreaData(["active_tcp_handles"], {
        active_tcp_handles: () => 2000 + parseInt(Math.random() * 100),
      });
    }

    if (trendType === 'udpTrend') {
      list = utils.createAreaData(["active_udp_handles"], {
        active_udp_handles: () => 0.1,
      });
    }

    // agentId.Number = c;

    setTimeout(() => res.send({ ok: true, data: { list, limit } }), 1000);
  });
};