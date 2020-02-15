'use strict';

import { http } from "../lib/Config";
import * as utils from "../lib/Utils";

const { agents } = http;

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.get = utils.get.bind(this);

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
        }
      });
    },

    setDefaultAgent() {
      if (this.agents.length > 0) {
        this.selectedAgentId = this.agents[0].value;
      }
    },

    getAgents() {
      this.get(agents.msg, agents.url, { appId: this.appId }, data => {
        const list = data.list;
        if (Array.isArray(list)) {
          this.agents = this.formatAgents(list);
          this.setDefaultAgent();
        }
      }, this.cancelToken.token)
    }
  }
};