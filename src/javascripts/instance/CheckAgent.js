"use strict";

import * as utils from "../lib/utils";

const { mapState: mapStateInstance, mapMutations: mapMutationsInstance, mapActions: mapActionsInstance } = utils.createNamespace("dashboard/instance");
const { mapMethods, mapWatch, handleMounted } = utils.modalRouteFactory("agentModal", "checkAgent", "setAgentModal", "getAgentInfo", "agent_loading");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  mounted() {
    handleMounted.call(this);
  },

  methods: {
    ...mapMutationsInstance(["setAgentModal"]),

    ...mapActionsInstance(["getAgentInfo"]),

    ...mapMethods,

    closeAgentCheck() {
      this.setAgentModal({ status: false });
    },
  },

  computed: {
    ...mapStateInstance(["agentModal", "agent_loading", "agent_load_error", "agent_data"]),
  },

  watch: {
    ...mapWatch,

    $route(to) {
      this.handleModal(to.query);
    },
  }

};