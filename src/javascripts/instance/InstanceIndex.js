"use strict";

import { tags } from "@/javascripts/config";
import * as utils from "@/javascripts/lib/utils";

const { mapState: mapStateDashboard } = utils.createNamespace("dashboard");
const { mapState: mapStateInstance, mapMutations: mapMutationsInstance, mapActions: mapActionsInstance } = utils.createNamespace("dashboard/instance");

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();

    // set variables by router
    const query = this.$route.query;
    this.selectedTab = query.tab || "process";
    this.selectedAgentId = query.agentId;

    // get agents
    this.getAgents(this.cancelToken.token);
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutationsInstance(["setAgentId", "setAgentModal"]),

    ...mapActionsInstance(["getAgents"]),

    formatAgents(list) {
      return list.map(({ agentId }) => {
        return {
          label: agentId,
          value: agentId
        };
      });
    },

    setDefaultAgent() {
      const agents = this.agents.map(agent => agent.value);
      if (agents.length > 0 &&
        (!this.selectedAgentId || !agents.includes(this.selectedAgentId))) {
        this.selectedAgentId = agents[0];
      }
      this.valueWhiteList.selectedAgentId = agents;
    },

    checkAgent() {
      this.setAgentModal({ status: true });
    }
  },

  computed: {
    ...mapStateDashboard(["appId"]),

    ...mapStateInstance(["agents_loading", "agents_load_error", "agents_data"]),

    checkAgentTip() {
      return utils.getTag(tags.checkAgent);
    },

    activeComponent() {
      let component = "";
      switch (this.selectedTab) {
        case "process":
          component = "x-process";
          break;
        case "system":
          component = "x-system";
          break;
        case "error_log":
          component = "x-error-log";
          break;
        case "module_risk":
          component = "x-module-risk";
          break;
        default:
          break;
      }

      return component;
    }
  },

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "tab", "selectedTab");
      utils.watchRoute.call(this, args, "agentId", "selectedAgentId");
    },

    selectedTab(...args) {
      utils.watchQueryKey.call(this, "tab", "selectedTab", args);
    },

    selectedAgentId(...args) {
      this.setAgentId(this.selectedAgentId);
      utils.watchQueryKey.call(this, "agentId", "selectedAgentId", args);
    },

    agents_data() {
      const list = this.agents_data;
      if (Array.isArray(list)) {
        this.agents = this.formatAgents(list);
        this.setDefaultAgent();
      }
    }
  }
};