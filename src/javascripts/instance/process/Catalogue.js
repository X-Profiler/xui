"use strict";

export default {
  methods: {
    updateSelectedProcess(data) {
      this.processData = data;
    },

    selectPid(proc) {
      this.$emit("selectPid", this.processes.indexOf(proc));
    },

    arrayCopy() {
      const res = [];
      for (const ele of this.processes) {
        res.push(ele);
      }
      return res;
    },

    soryByKey(key) {
      const arr = this.arrayCopy();
      arr.sort((o, n) => Number(o[key]) < Number(n[key]) ? 1 : -1);
      return arr;
    },

    sort(type) {
      if (type === "cpu") {
        return this.soryByKey("cpuUsage");
      }

      if (type === "heapMemory") {
        return this.soryByKey("heapUsage");
      }

      if (type === "rss") {
        return this.soryByKey("rss");
      }

      if (type === "gc") {
        return this.soryByKey("gcUsage");
      }

      if (type === "timer") {
        return this.soryByKey("timers");
      }

      if (type === "tcp") {
        return this.soryByKey("tcpHandles");
      }

      if (type === "udp") {
        return this.soryByKey("udpHandles");
      }

      return this.processes;
    }
  }
};