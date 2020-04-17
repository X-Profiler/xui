"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/file/wrapper");
const { mapState: mapStateAnalytics, mapActions: mapActionsAnalytics } = utils.createNamespace("dashboard/analytics");

const { formatTime, formatSize } = utils;

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.downloadFile({
      cancelToken: this.cancelToken.token,
      fileId: this.gcData.fileId,
      fileType: this.gcData.fileType
    });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActionsAnalytics(["downloadFile"]),

    calculateSize(spaces) {
      let total = 0;
      for (const space of spaces) {
        total += space.space_used_size;
      }
      return total;
    }
  },

  computed: {
    ...mapState(["gcData"]),

    ...mapStateAnalytics(["file_loading", "file_load_error", "file_data"]),

    overviewData() {
      const data = this.file_data;
      if (!data) {
        return [];
      }

      const { startTime, stopTime, gc: gcList } = this.file_data;

      let totalPauseTime = 0;
      let totalGcCount = 0;
      let scavengeCount = 0;
      let marksweepCount = 0;
      let incrementalMarkingCont = 0;

      const totalGcTime = (stopTime - startTime) * 1000;
      for (const gc of gcList) {
        totalPauseTime += +(gc.end - gc.start);
        totalGcCount++;
        if (gc.type === 'scavenge') {
          scavengeCount++;
        }
        if (gc.type === 'marksweep') {
          marksweepCount++;
        }
        if (gc.type === 'marking') {
          incrementalMarkingCont++;
        }
      }

      const gcDurationStatus = `${formatTime(totalPauseTime)} / ${formatTime(totalGcTime)}`;
      const gcCountStatus = `${totalGcCount} ( ${scavengeCount} / ${marksweepCount} / ${incrementalMarkingCont} )`;
      let memoryBeforeFirstGc;
      let memoryAfterLastGc;
      if (gcList.length) {
        memoryBeforeFirstGc = formatSize(this.calculateSize(gcList[0].before));
        memoryAfterLastGc = formatSize(this.calculateSize(gcList[gcList.length - 1].after));
      } else {
        memoryBeforeFirstGc = "-";
        memoryAfterLastGc = "-";
      }

      return [
        { label: "追踪期间 GC 暂停总时间 / 追踪时长", value: gcDurationStatus },
        { label: "GC 次数 (Scavenge / Mark-Sweep / Incremental-Marking)", value: gcCountStatus },
        { label: "第一次 GC 前堆大小", value: memoryBeforeFirstGc },
        { label: "最后一次 GC 后堆大小", value: memoryAfterLastGc }
      ];
    }
  }
};