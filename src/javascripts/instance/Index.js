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
      if (this.agents.length > 0 &&
        (!this.selectedAgentId || !this.agents.includes(this.selectedAgentId))) {
        this.selectedAgentId = this.agents[0].value;
      }
      this.valueWhiteList.selectedAgentId = this.agents.map(agent => agent.value);
    },

    getAgents() {
      this.get(agents.msg, agents.url, { appId: this.appId }, data => {
        const list = data.list;
        if (Array.isArray(list)) {
          this.agents = this.formatAgents(list);
          this.setDefaultAgent();
        }
      }, this.cancelToken.token, "agentsLoading");
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