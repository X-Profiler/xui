export default {
  // app overview
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
  }
};