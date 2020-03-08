"use strict";

import * as utils from "../../lib/utils";

const { mapState: mapStateProcess, mapMutations: mapMutationsProcess, mapActions: mapActionsProcess } = utils.createNamespace("dashboard/instance/process");
const { mapMethods, mapWatch, handleMounted } = utils.modalRouteFactory("xprofilerStatusModal", "checkXprofiler", "setXprofilerStatusModal",
  "getXprofilerStatus", "xprofiler_status_loading", ["pid"]);

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  mounted() {
    handleMounted.call(this);
  },

  methods: {
    ...mapMutationsProcess(["setXprofilerStatusModal"]),

    ...mapActionsProcess(["getXprofilerStatus"]),

    ...mapMethods,

    closeXprofilerCheck() {
      this.showLogdir = false;
      this.showConfig = false;
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
        style: "color: " + (status ? this.healthyColor : this.wrongColor) + ";"
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
      if (!xprofiler_status_data) {
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
      let str = `3. 进程 ${this.pid} 使用的运行时版本为 <code style="font-size: 12px;color: #2a9446;font-weight: bold;">${nodeVersion}</code>`;
      // let str = `2. 进程 ${this.pid} 使用的运行时版本为 ${nodeVersion}`;

      const xprofilerVersion = xprofiler_status_data.xprofilerVersion;
      if (this.validXprofiler && xprofilerVersion) {
        str += `，插件版本为 <code style="font-size: 12px;color: #2a9446;font-weight: bold;">${xprofilerVersion}</code>`;
      }

      return str;
    }
  },

  watch: {
    ...mapWatch,

    $route(to) {
      this.handleModal(to.query);
    }
  }
};