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
  }
};