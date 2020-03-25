"use strict";

import moment from "moment";
import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/errors");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    this.getErrorLogs({
      cancelToken: this.cancelToken.token,
      currentPage: this.currentPage,
      pageSize: this.pageSize
    });
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
    this.set_logs_load_error(undefined);
  },

  methods: {
    ...mapMutations(["set_logs_load_error"]),

    ...mapActions(["getErrorLogs"]),
  },

  computed: {
    ...mapState(["logs_loading", "logs_load_error", "logs_data"]),

    errors() {
      const logs = this.logs_data;
      return logs.map(log => {
        const occuredTime = moment(Number(log.timestamp)).format("YYYY-MM-DD HH:mm:SS").split(" ");

        return {
          date: occuredTime[0],
          time: occuredTime[1],
          type: log.type,
          stack: log.stack.split("\n"),
          extra: log.extra.split("\n")
        };
      });
    }
  },
};