"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: uploadState, mutations: uploadMutations, handle: handleUpload } =
  utils.storeFactory("upload", undefined);

const { state: fileListState, mutations: fileListMutations, handle: handleFileList } =
  utils.storeFactory("files", { list: [], count: 0 });

export default {
  namespaced: true,

  state: {
    ...uploadState,

    ...fileListState,

    fileTypes: [
      { label: "CPU Profile", value: "cpuprofile", icon: "ios-stopwatch" },
      { label: "Heap Profile", value: "heapprofile", icon: "ios-timer" },
      { label: "GC 追踪", value: "gclog", icon: "ios-locate" },
      { label: "堆快照", value: "heapsnapshot", icon: "md-camera" },
      { label: "诊断报告", value: "diag", icon: "md-medkit" },
      { label: "核心转储", value: "core", icon: "md-list-box" },
      { label: "进程趋势", value: "trend", icon: "ios-podium" }
    ],
    nessaryQueryArgs: ["filterType"],
    uploadModal: undefined,
    filterType: undefined
  },

  getters: {
    normalValidTypes(state) {
      return state.fileTypes.map(fileType => fileType.value).filter(type => type !== "core");
    },

    filterTypes(state) {
      const filterTypes = state.fileTypes.map(fileType => fileType);
      filterTypes.unshift({ label: "全部", value: "all" });
      filterTypes.push({ label: "收藏", value: "favor" });
      return filterTypes;
    },

    getIconByType: state => type => {
      const types = state.fileTypes;
      // let icon = "logo-freebsd-devil";
      let icon = "";
      for (const t of types) {
        if (t.value === type && t.icon) {
          icon = t.icon;
        }
      }
      return icon;
    },

    getLabelByType: state => type => {
      const types = state.fileTypes;
      let str = "Unknown";
      for (const t of types) {
        if (t.value === type) {
          str = t.label;
        }
      }
      return str;
    },
  },

  mutations: {
    ...uploadMutations,

    ...fileListMutations,

    setUploadModal(state, { status }) {
      if (status === false || status === true) {
        state.uploadModal = status;
      }
    },

    setFilterType(state, filterType) {
      state.filterType = filterType;
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

    async getFiles(context, { cancelToken, filterType, currentPage, pageSize }) {
      const { rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.fileList,
        data: {
          appId: rootGetters.appId,
          filterType,
          currentPage,
          pageSize
        }
      };

      await handleFileList(context, options);
    }
  }
};