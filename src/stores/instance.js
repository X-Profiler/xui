"use stritc";

import * as utils from "@/javascripts/lib/utils";

const { state: agentsState, mutations: agentsMutations, handle: handleAgents } = utils.storeFactory("agents", []);
const { state: agentState, mutations: agentMutations, handle: handleAgent } = utils.storeFactory("agent", []);

export default {
  namespaced: true,

  state: {
    ...agentsState,
    ...agentState,

    agentId: undefined,
    agentModal: undefined,
  },

  mutations: {
    ...agentsMutations,
    ...agentMutations,

    setAgentId(state, agentId) {
      state.agentId = agentId;
    },

    setAgentModal(state, { status }) {
      if (status === true || status === false) {
        state.agentModal = status;
      }
    }
  },

  actions: {
    async getAgents(context, cancelToken) {
      const { rootState, rootGetters } = context;
      const options = {
        cancelToken,

        // user data
        url: rootState.url.agents,
        data: {
          appId: rootGetters.appId
        }
      };

      await handleAgents(context, options, "list", "array");
    },

    async getAgentInfo(context, { cancelToken }) {
      const { state, rootState, rootGetters } = context;

      const options = {
        cancelToken,

        // user data
        url: rootState.url.agentInfo,
        data: {
          appId: rootGetters.appId,
          agentId: state.agentId
        }
      };

      await handleAgent(context, options, "list", "array");
    }
  }
};