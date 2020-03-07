"use strict";

import * as utils from "../lib/utils";

const { mapState: mapStateInstance, mapMutations: mapMutationsInstance, mapActions: mapActionsInstance } = utils.createNamespace("dashboard/instance");

export default {

  created() {
    this.cancelToken = utils.createCancelToken();
  },

  mounted() {
    this.checkAgent = this.$refs.checkAgent;
  },

  methods: {
    ...mapMutationsInstance(["setAgentModal"]),

    ...mapActionsInstance(["getAgentInfo"]),

    closeAgentCheck() {
      this.setAgentModal(false);
    },
  },

  computed: {
    ...mapStateInstance(["agentModal", "agent_loading", "agent_load_error", "agent_data"]),
  },

  watch: {
    agentModal() {
      if (this.agentModal) {
        this.checkAgent.showModal();
        this.getAgentInfo(this.cancelToken.token);
      } else {
        this.checkAgent.cancelModal();
        if (this.agent_loading) {
          utils.cancelRequest(this.cancelToken);
          this.cancelToken = utils.createCancelToken();
        }
      }
    }
  }

}