"use strict";

export default {
  url: {
    // user
    user: "/xapi/user",

    // consoler
    app: "/xapi/app",
    apps: "/xapi/apps",
    overviewMetrics: "/xapi/overview_metrics",
    processCpuUsage: "/xapi/overview/process_cpu_usage",
    processMemoryUsage: "/xapi/overview/process_memory_usage",
    systemCpuUsage: "/xapi/overview/system_cpu_usage",
    systemMemoryUsage: "/xapi/overview/system_memory_usage",
    diskUsage: "/xapi/overview/disk_usage",

    // dashboard/instance
    agents: "/xapi/agents",
    agentInfo: "/xapi/agent",

    // dashboard/instance/process
    agentXprofilerProcesses: "/xapi/xprofiler_processes",
    agentNodeProcesses: "/xapi/node_processes",
    xprofilerStatus: "/xapi/xprofiler_status",
    processTrend: "/xapi/process_trend",
    action: "/xapi/action",

    // dashboard/instance/system
    overview: "/xapi/system_overview",
    systemTrend: "/xapi/system_trend",

    // dashboard/instance/errors
    errorFiles: "/xapi/error_files",
    errorLogs: "/xapi/error_logs",

    // dashboard/instance/modules
    moduleFiles: "/xapi/module_files",
    module: "/xapi/module",

    // file
    uploadFile: "/xapi/upload_file",
    fileList: "/xapi/files",
    fileFavor: "/xapi/file_favor",
    fileTransfer: "/xapi/file_transfer",
    fileDeletion: "/xapi/file_deletion"
  }
};