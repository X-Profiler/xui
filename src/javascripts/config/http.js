export default {
  user: {
    url: "/xapi/user",
    msg: {
      ch: "获取用户信息失败，请重试",
      en: "Get user info failed, please retry."
    }
  },

  // app overview
  apps: {
    url: "/xapi/apps",
    msg: {
      ch: "获取应用列表失败，请重试",
      en: "Get applications failed, please retry."
    }
  },
  instanceCount: {
    url: "/xapi/instance_count",
    msg: {
      ch: "获取实例数失败，请重试",
      en: "Get instance count failed, please retry."
    }
  },
  alarmCount: {
    url: "/xapi/alarm_count",
    msg: {
      ch: "获取告警数失败，请重试",
      en: "Get alarm count failed, please retry."
    }
  },
  riskCount: {
    url: "/xapi/risk_count",
    msg: {
      ch: "获取依赖风险数失败，请重试",
      en: "Get risk count failed, please retry."
    }
  },
  processCpuUsage: {
    url: "/xapi/overview/process_cpu_usage",
    msg: {
      ch: "获取进程 CPU 概览信息失败，请重试",
      en: "Get cpu usage overview failed, please retry."
    }
  },
  processMemoryUsage: {
    url: "/xapi/overview/process_memory_usage",
    msg: {
      ch: "获取进程堆内存概览信息失败，请重试",
      en: "Get heap memory overview failed, please retry."
    }
  },
  systemCpuUsage: {
    url: "/xapi/overview/system_cpu_usage",
    msg: {
      ch: "获取系统 CPU 概览信息失败，请重试",
      en: "Get system cpu overview failed, please retry."
    }
  },
  systemMemoryUsage: {
    url: "/xapi/overview/system_memory_usage",
    msg: {
      ch: "获取系统可用内存信息失败，请重试",
      en: "Get system available memory failed, please retry."
    }
  },
  diskUsage: {
    url: "/xapi/overview/disk_usage",
    msg: {
      ch: "获取磁盘概览信息失败，请重试",
      en: "Get disk usage overview failed, please retry."
    }
  },

  // single app
  app: {
    url: "/xapi/app",
    msg: {
      get: {
        ch: "获取应用信息失败，请重试",
        en: "Get application info failed, please retry."
      },
      post: {
        ch: "创建应用失败，请重试",
        en: "Create application failed, please retry."
      }
    }
  },

  // instance
  agents: {
    url: "/xapi/agents",
    msg: {
      ch: "获取应用实例信息失败，请重试",
      en: "Get agents failed, please retry."
    }
  },

  // instance process
  processes: {
    url: "/xapi/processes",
    msg: {
      ch: "获取应用实例上的 Node.js 进程列表失败，请重试",
      en: "Get agent Node.js processes failed. please retry."
    }
  },
  xProcesses: {
    url: "/xapi/x_processes",
    msg: {
      ch: "获取应用实例上接入 Xprofiler 插件的进程列表失败，请重试",
      en: "Get agent xprofiler's processes failed. please retry."
    }
  },
  agent: {
    url: "/xapi/agent",
    msg: {
      ch: "获取实例信息失败，请重试",
      en: "Get agent info  failed, please retry."
    }
  }
};