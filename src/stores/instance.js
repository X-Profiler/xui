"use stritc";

export default {
  namespaced: true,

  state: {
    agentId: undefined
  },

  mutations: {
    setAgentId(state, agentId) {
      state.agentId = agentId;
    }
  }
};