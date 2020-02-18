"use strict";

import { tags, http } from "./config";
import * as utils from "./lib/utils";

const { app } = http;

export default {
  created() {
    // get type from query
    const query = this.$route.query;
    this.selectedType = query.type || "myApps";

    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.post = utils.post.bind(this);
  },

  mounted() {
    // get modal
    this.consoleModal = this.$refs.consoleModal;
    // get app list
    this.appList = this.$refs.appList;
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    showNewAppCreation() {
      this.consoleModal.showModal();
    },

    submitNewAppCreation() {
      let newAppName = this.newAppName.trim();

      // check app name
      if (!newAppName) {
        utils.error.call(this, "应用名称不能为空！");
        return;
      }
      if (newAppName.length > 30) {
        utils.error.call(this, "应用名称不能超过 30 个字符！");
        return;
      }

      // submit
      this.post(app.msg.post, app.url, { newAppName }, data => {
        if (data === utils.failedCode) {
          return;
        }
        this.consoleModal.cancelModal();
        this.appList.refreshApps();
      }, this.cancelToken.token, "newAppCreationLoading");
    }
  },

  computed: {
    myApps() {
      return utils.getTag(tags.myApps);
    },

    joinedApps() {
      return utils.getTag(tags.joinedApps);
    },

    newAppCreationTag() {
      return utils.getTag(tags.newAppCreation);
    },

    applicationNameTag() {
      return utils.getTag(tags.newAppName);
    },

    newAppNamePlaceholderTag() {
      return utils.getTag(tags.newAppNamePlaceholder);
    },

    newAppNameAttentionTag() {
      return utils.getTag(tags.newAppNameAttention);
    },

    newAppNameAttentionDetailTag() {
      return utils.getTag(tags.newAppNameAttentionDetail);
    },

    submitTag() {
      return utils.getTag(tags.submit);
    },

    submittingTag() {
      return utils.getTag(tags.submitting);
    },

    closeTag() {
      return utils.getTag(tags.close);
    }
  },

  watch: {
    $route(to) {
      if (to.query.type !== this.selectedType) {
        this.selectedType = to.query.type;
      }
    },

    selectedType(newVal, oldVal) {
      const replace = oldVal === undefined;
      utils.watchRoute.call(this, "type", "selectedType", replace);
    }
  }
};