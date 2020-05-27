'use strict';

module.exports = [
  {
    strategyId: 8,
    contextType: 'xprofiler_log',
    pushType: 'p3',
    expression: '@cpu_60 > 80',
    alarmContent: '1 分钟内 CPU 使用率超过 80%，当前为 ${@cpu_60}%',
    status: 1,
    webhookPush: 0,
    webhookType: "dingtalk",
    webhookAddress: '',
    webhookSign: '',
    alarmCount: 666
  },
  {
    strategyId: 2,
    contextType: 'xprofiler_log',
    pushType: 'p3',
    expression: '@heap_used / @heap_limit > 0.7',
    alarmContent: '已用堆内存超过堆上限的 70%，当前为 ${@heap_used / @heap_limit * 100}%',
    status: 0,
    alarmCount: 0
  },
  {

    strategyId: 7,
    contextType: 'system_log',
    pushType: 'p3',
    expression: '@disk_usage > 85',
    alarmContent: '磁盘 (${@mounted_on}) 占比超过 85%：为 ${@disk_usage}%',
    status: 1,
    webhookPush: true,
    webhookType: 'dingtalk',
    webhookAddress: 'https://oapi.dingtalk.com/robot/send?access_token=458c8b0d53ac27f3ff40de3ac460034e6cbf28339cf4065fd680463c49b9851b',
    webhookSign: 'SECdea**********************************************************',
    alarmCount: 520
  }
];
