"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState: mapStateProcess, mapMutations: mapMutationsProcess, mapActions: mapActionsProcess } = utils.createNamespace("dashboard/instance/process");
const { mapMethods, mapWatch, handleMounted } =
  utils.modalRouteFactory("modalQueryKey", "xprofilerStatusModal", "checkXprofiler", "setXprofilerStatusModal",
    "getXprofilerStatus", "xprofiler_status_loading", ["pid"]);

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  mounted() {
    handleMounted.call(this, "handleXprofiler");
  },

  methods: {
    ...mapMutationsProcess(["setXprofilerStatusModal"]),

    ...mapActionsProcess(["getXprofilerStatus"]),

    ...mapMethods("handleXprofiler"),

    closeXprofilerCheck() {
      this.setXprofilerStatusModal({ status: false });
    },

    getIconStyle(key1, key2) {
      if (!this.xprofiler_status_data) {
        return { icon: "md-help-circle" };
      }
      let status = this.xprofiler_status_data[key1];
      if (key2) {
        status = this.xprofiler_status_data[key1] &&
          (this.xprofiler_status_data[key1] === this.xprofiler_status_data[key2]);
      }
      return {
        icon: status ? "md-checkmark-circle" : "md-close-circle",
        style: "color: " + (status ? this.healthyColor : this.wrongColor) + ";",
        color: status ? this.healthyColor : this.wrongColor,
        status
      };
    }
  },

  computed: {
    ...mapStateProcess(["xprofilerStatusModal", "xprofilerCheckPid", "xprofiler_status_loading", "xprofiler_status_load_error", "xprofiler_status_data"]),

    pid() {
      return this.xprofilerCheckPid;
    },

    installStatus() {
      return this.getIconStyle("installXprofiler");
    },

    enableStatus() {
      return this.getIconStyle("enableXprofiler");
    },

    logdirStatus() {
      return this.getIconStyle("xprofilerLogdir", "xtransitLogdir");
    },

    validXprofiler() {
      const xprofiler_status_data = this.xprofiler_status_data;
      return xprofiler_status_data && xprofiler_status_data.installXprofiler && xprofiler_status_data.enableXprofiler;
    },

    config() {
      const xprofiler_status_data = this.xprofiler_status_data;
      if (!xprofiler_status_data || !xprofiler_status_data.xprofilerConfig) {
        return [];
      }
      return Object.entries(xprofiler_status_data.xprofilerConfig).map(([key, value]) => {
        return { key, value };
      });
    },

    versionInfo() {
      const xprofiler_status_data = this.xprofiler_status_data;
      if (!xprofiler_status_data) {
        return "";
      }
      const nodeVersion = xprofiler_status_data.nodeVersion || "未知";
      let str = `进程 ${this.pid} 使用的运行时版本为 <code style="font-size: 12px;color: #2a9446;font-weight: bold;">${nodeVersion}</code>`;
      // let str = `2. 进程 ${this.pid} 使用的运行时版本为 ${nodeVersion}`;

      const xprofilerVersion = xprofiler_status_data.xprofilerVersion;
      if (this.validXprofiler && xprofilerVersion) {
        str += `，插件版本为 <code style="font-size: 12px;color: #2a9446;font-weight: bold;">${xprofilerVersion}</code>`;
      }

      return str;
    },

    checkList() {
      const installStatus = this.installStatus;
      const enableStatus = this.enableStatus;
      const logdirStatus = this.logdirStatus;
      const xprofiler_status_data = this.xprofiler_status_data;
      const validXprofiler = this.validXprofiler;

      if (!xprofiler_status_data) {
        return [];
      }

      const marginTop = "margin-top: 8px;";

      return [
        {
          label: "插件 X-Profiler 状态：",
          children: [
            { label: installStatus.status ? "已安装" : "未安装", icon: installStatus.icon, style: installStatus.style },
            { label: enableStatus.status ? "已启用" : "未启用", icon: enableStatus.icon, style: enableStatus.style },
            {
              label: logdirStatus.status ? "日志目录配置成功" : "日志目录配置失败", icon: logdirStatus.icon, style: logdirStatus.style, dropdown: validXprofiler,
              children: [
                { label: "配置 xprofiler 日志目录：" + xprofiler_status_data.xprofilerLogdir, color: logdirStatus.color },
                { label: "配置 xtransit 日志目录： " + xprofiler_status_data.xtransitLogdir, color: logdirStatus.color }
              ]
            }
          ]
        },

        {
          label: "插件 X-Profiler 配置：",
          style: marginTop,
          children: [
            {
              label: validXprofiler ? "配置获取成功" : "无法获取配置",
              icon: validXprofiler ? "md-checkmark-circle" : "md-close-circle",
              style: "color: " + (validXprofiler ? this.healthyColor : this.wrongColor) + ";",
              dropdown: validXprofiler,
              children: this.config.map(cfg => {
                return {
                  label: `<div style="font-size: 14px">${cfg.key}: ${cfg.value}</div>`,
                  color: validXprofiler ? this.healthyColor : this.wrongColor
                };
              })
            }
          ]
        },

        {
          label: this.versionInfo,
          style: marginTop
        }
      ];
    }
  },

  watch: {
    ...mapWatch,

    $route(to) {
      this.handleXprofiler(to.query);
    }
  }
};