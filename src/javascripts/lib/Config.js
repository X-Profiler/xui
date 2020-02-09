'use strict';

export const http = {
  user: {
    url: '/xapi/user',
    msg: {
      ch: '获取用户信息失败，请重试',
      en: 'Get user info failed, please retry'
    }
  },

  // app overview
  apps: {
    url: '/xapi/apps',
    msg: {
      ch: '获取应用列表失败，请重试',
      en: 'Get applications failed, please retry'
    }
  },
  instanceCount: {
    url: '/xapi/instance_count',
    msg: {
      ch: '获取实例数失败，请重试',
      en: 'Get instance count failed, please retry'
    }
  },
  alarmCount: {
    url: '/xapi/alarm_count',
    msg: {
      ch: '获取告警数失败，请重试',
      en: 'Get alarm count failed, please retry'
    }
  },
  riskCount: {
    url: '/xapi/risk_count',
    msg: {
      ch: '获取依赖风险数失败，请重试',
      en: 'Get risk count failed, please retry'
    }
  },
  processCpuUsage: {
    url: '/xapi/overview/process_cpu_usage',
    msg: {
      ch: '获取进程 CPU 概览信息失败，请重试',
      en: 'Get cpu usage overview failed, please retry'
    }
  },
  processMemoryUsage: {
    url: '/xapi/overview/process_memory_usage',
    msg: {
      ch: '获取进程堆内存概览信息失败，请重试',
      en: 'Get heap memory overview failed, please retry'
    }
  },
  diskUsage: {
    url: '/xapi/overview/disk_usage',
    msg: {
      ch: '获取磁盘概览信息失败，请重试',
      en: 'Get disk usage overview failed, please retry'
    }
  }
};

export const tags = {
  // nav
  docs: {
    ch: '使用指南',
    en: 'User Guide'
  },
  console: {
    ch: '控制台',
    en: 'Console'
  },
  lang: {
    ch: '切换英文',
    en: 'Chinese'
  },

  // tab
  myApps: {
    ch: '我的应用',
    en: 'My Apps'
  },
  joinedApps: {
    ch: '加入的应用',
    en: 'Joined Apps'
  }
}