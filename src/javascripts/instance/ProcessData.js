"use strict";

import { http } from "../config";
import * as utils from "../lib/utils";

const { xProcesses } = http;

export default {
  created() {
    // set common http methods
    this.cancelToken = utils.createCancelToken();
    this.get = utils.get.bind(this);

    // get xprofiler processes
    this.getAgentXProcesses();
  },

  methods: {
    getAgentXProcesses() {
      this.get(xProcesses.msg, xProcesses.url, { appId: this.appId, agentId: this.agentId }, data => {
        console.log(data);
      }, this.cancelToken.token);
    }
  }
};