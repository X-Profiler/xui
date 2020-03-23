"use strict";

import { tags } from "./config";
import * as utils from "./lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("consoler");
const { mapMethods: mapMethodsNewApp, mapWatch: mapWatchNewApp, handleMounted: handleMountedNewApp } =
  utils.modalRouteFactory("modalQueryKey", "newAppModal", "newApp", "setNewAppModal");

export default {
  created() {
    // get type from query
    const query = this.$route.query;
    this.selectedType = query.type || "myApps";

    // set common http methods
    this.cancelToken = utils.createCancelToken();
  },

  mounted() {
    // get app list
    this.appList = this.$refs.appList;

    handleMountedNewApp.call(this, "handleNewAppModal");
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapActions(["createNewApp"]),

    ...mapMutations(["setNewAppModal"]),

    ...mapMethodsNewApp("handleNewAppModal"),

    showNewAppCreation() {
      this.setNewAppModal({ status: true });
    },

    closeNewAppModal() {
      this.setNewAppModal({ status: false });
    }
  },

  computed: {
    ...mapState(["new_app_loading", "newAppModal"]),

    myApps() {
      return utils.getTag(tags.myApps);
    },

    joinedApps() {
      return utils.getTag(tags.joinedApps);
    },

    newAppCreationTag() {
      return utils.getTag(tags.newAppCreation);
    }
  },

  watch: {
    ...mapWatchNewApp,

    $route(...args) {
      utils.watchRoute.call(this, args, "type", "selectedType");
      this.handleNewAppModal(args[0].query);
    },

    selectedType(...args) {
      utils.watchQueryKey.call(this, "type", "selectedType", args);
    },

    new_app_loading() {
      if (!this.new_app_loading && !this.new_app_load_error) {
        this.setNewAppModal({ status: false });
        this.appList.refreshApps();
      }
    }
  }
};