"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: uploadState, mutations: uploadMutations, handle: handleUpload } =
  utils.storeFactory("upload", undefined);

export default {
  namespaced: true,

  state: {
    ...uploadState,

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
    ...uploadMutations,

    setUploadModal(state, { status }) {
      if (status === false || status === true) {
        state.uploadModal = status;
      }
    }
  },

  actions: {
    async uploadFile(context, { cancelToken, formData, fileType }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,
        method: "POST",

        // user data
        url: `${rootState.url.uploadFile}?appId=${rootGetters.appId}&fileType=${fileType}`,
        data: formData
      };

      await handleUpload(context, options, "file");
    },
  }
};