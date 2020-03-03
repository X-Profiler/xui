"use strict";

import { http, tags } from "../config";
import * as utils from "../lib/utils";

const { agents } = http;

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.get = utils.get.bind(this);

    // set variables by router
    const query = this.$route.query;
    this.selectedTab = query.tab || "process";
    this.selectedAgentId = query.agentId;

    // get agents
    this.getAgents();
  },

  mounted() {
    this.checkAgentModal = this.$refs.checkAgent;
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
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

    getAgents() {
      this.agentsLoading = true;
      this.get(agents.msg, agents.url, { appId: this.appId }, data => {
        const list = data.list;
        if (Array.isArray(list)) {
          this.agents = this.formatAgents(list);
          this.setDefaultAgent();
          this.agentsLoading = false;
        }
      }, this.cancelToken.token);
    },

    checkAgent() {
      this.checkAgentModal.showModal();
    }
  },

  computed: {
    checkAgentTip() {
      return utils.getTag(tags.checkAgent);
    },

    activeComponent() {
      let component = "";
      switch (this.selectedTab) {
        case "process":
          component = "x-process-data";
          break;
        case "system":
          component = "x-system-data";
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
      utils.watchQueryKey.call(this, "agentId", "selectedAgentId", args);
    }
  }
};