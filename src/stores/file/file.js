"use strict";

export default {
  namespaced: true,

  state: {
    fileTypes: [
      { label: "CPU Profile", value: "cpuprofile" },
      { label: "Heap Profile", value: "heapprofile" },
      { label: "GC 追踪", value: "gclog" },
      { label: "堆快照", value: "heapsnapshot" },
      { label: "诊断报告", value: "diag" },
      { label: "核心转储", value: "core" },
      { label: "进程趋势", value: "trend" }
    ],

    uploadModal: undefined
  },

  getters: {
    normalValidTypes(state) {
      return state.fileTypes.map(fileType => fileType.value).filter(type => type !== "core");
    }
  },

  mutations: {
    setUploadModal(state, { status }) {
      if (status === false || status === true) {
        state.uploadModal = status;
      }
    }
  }
};