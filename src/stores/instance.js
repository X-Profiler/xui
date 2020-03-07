"use stritc";

import * as utils from "../javascripts/lib/utils";

const { state: agentsState, mutations: agentsMutations, handle: handleAgents } = utils.storeFactory("agents", []);
const { state: agentState, mutations: agentMutations, handle: handleAgent } = utils.storeFactory("agent", []);

export default {
  namespaced: true,

  state: {
    ...agentsState,
    ...agentState,

    agentId: undefined,
    agentModal: false,
  },

  getters: {
    appId(...args) {
      const rootState = args[2];
      return rootState.dashboard.appId;
    }
  },

  mutations: {
    ...agentsMutations,
    ...agentMutations,

    setAgentId(state, agentId) {
      state.agentId = agentId;
    },

    setAgentModal(state, status) {
      state.agentModal = status;
    }
  },

  actions: {
    async getAgents(context, cancelToken) {
      const { getters, rootState } = context;
      const options = {
        cancelToken,

        // user data
        url: rootState.url.agents,
        data: {
          appId: getters.appId
        }
      };

      await handleAgents(context, options, "list", "array");
    },

    async getAgentInfo(context, cancelToken) {
      const { state, getters, rootState } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.agentInfo,
        data: {
          appId: getters.appId,
          agentId: state.agentId
        }
      };

      await handleAgent(context, options, "list", "array");
    }
  }
};