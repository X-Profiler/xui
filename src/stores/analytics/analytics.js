"use strict";

import * as utils from "@/javascripts/lib/utils";

const { state: fileState, mutations: fileMutations, handle: handleFile } =
  utils.storeFactory("file", undefined);

export default {
  namespaced: true,

  state: {
    ...fileState
  },

  mutations: {
    ...fileMutations
  },

  actions: {
    async downloadFile(context, { cancelToken, fileId, fileType }) {
      const { rootState } = context;

      const options = {
        cancelToken,
        rawData: true,

        headers: {
          "accept-encoding": "gzip"
        },

        // user data
        url: rootState.url.downloadFile,
        data: {
          fileId,
          fileType
        }
      };

      await handleFile(context, options);
    }
  }
};