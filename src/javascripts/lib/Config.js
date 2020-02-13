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
  systemCpuUsage: {
    url: '/xapi/overview/system_cpu_usage',
    msg: {
      ch: '获取系统 CPU 概览信息失败，请重试',
      en: 'Get system cpu overview failed, please retry'
    }
  },
  systemMemoryUsage: {
    url: '/xapi/overview/system_memory_usage',
    msg: {
      ch: '获取系统可用内存信息失败，请重试',
      en: 'Get system available memory failed, please retry'
    }
  },
  diskUsage: {
    url: '/xapi/overview/disk_usage',
    msg: {
      ch: '获取磁盘概览信息失败，请重试',
      en: 'Get disk usage overview failed, please retry'
    }
  },

  // single app
  app: {
    url: '/xapi/app',
    msg: {
      post: {
        ch: '创建应用失败，请重试',
        en: 'Create application failed, please retry'
      }
    }
  }
};

export const tags = {
  // nav
  docs: {
    ch: '使用指南',
    en: 'Document'
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
  },

  // create new app modal
  newAppCreation: {
    ch: '创建新应用',
    en: 'New Application'
  },
  newAppName: {
    ch: '应用名称',
    en: 'App Name'
  },
  newAppNamePlaceholder: {
    ch: '请输入您的应用名称',
    en: 'Input your new application name'
  },
  newAppNameAttention: {
    ch: '注意',
    en: 'Attention'
  },
  newAppNameAttentionDetail: {
    ch: '应用名称最大长度不能超过 30 个字符',
    en: 'Length of the application name cannot exceed 30 characters.'
  },
  submit: {
    ch: '提交',
    en: 'Submit'
  },
  submitting: {
    ch: '提交中...',
    en: 'submitting...'
  },
  close: {
    ch: '关闭',
    en: 'Close'
  },

  // overview title metrics
  instance: {
    ch: '实例',
    en: 'agent'
  },
  file: {
    ch: '文件',
    en: 'file'
  },
  team: {
    ch: '团队',
    en: 'team'
  },
  alarm: {
    ch: '告警',
    en: 'alarm'
  },
  settings: {
    ch: '设置',
    en: 'setting'
  },
  instanceCount: {
    ch: '实例个数',
    en: 'agents'
  },
  alarmCount: {
    ch: '24h 告警数',
    en: 'alarms (24h)'
  },
  rsikCount: {
    ch: '依赖风险数',
    en: 'risk modules'
  },

  // main metrics
  processCpuUsage: {
    ch: 'Node.js 进程 CPU 负载',
    en: 'cpu status'
  },
  processMemoryUsage: {
    ch: 'Node.js 进程堆内存状态',
    en: 'heap memory status'
  },
  systemCpuUsage: {
    ch: '系统整体 CPU 负载',
    en: 'system cpu status'
  },
  systemMemoryUsage: {
    ch: '系统整体可用内存状态',
    en: 'system memory status'
  },
  diskUsage: {
    ch: '磁盘使用率',
    en: 'disk usage'
  }
}