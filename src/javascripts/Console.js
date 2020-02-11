'use strict';

import { tags, http } from "./lib/Config";
import * as utils from "./lib/Utils";

const { app } = http;

export default {
  created() {
    // get type from query
    const query = this.$route.query;
    if (query.type) {
      this.selectedType = query.type;
    }

    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.post = utils.post.bind(this);
  },

  mounted() {
    // get modal
    this.consoleModal = this.$refs.consoleModal;
  },

  methods: {
    showNewAppCreation() {
      this.consoleModal.showModal();
    },

    submitNewAppCreation() {
      let newAppName = this.newAppName;

      // check app name
      if (!newAppName) {
        utils.error.call(this, '应用名称不能为空！');
        return;
      }
      newAppName = newAppName.trim();
      if (newAppName.length > 30) {
        utils.error.call(this, '应用名称不能超过 30 个字符！');
        return;
      }

      // submit
      this.post(app.msg.post, app.url, { newAppName }, () => {
        this.consoleModal.cancelModal();
      }, this.cancelToken.token, 'newAppCreationLoading');
    }
  },

  computed: {
    myApps() {
      return utils.getTag(tags.myApps);
    },

    joinedApps() {
      return utils.getTag(tags.joinedApps);
    }
  },

  watch: {
    selectedType() {
      if (this.$route.query.type === this.selectedType) {
        return;
      }

      // go to new tab
      this.$router.push({
        path: this.$route.path,
        query: { type: this.selectedType }
      });
    },

    $route(to) {
      if (to.query.type !== this.selectedType) {
        this.selectedType = to.query.type;
      }
    }
  }
};