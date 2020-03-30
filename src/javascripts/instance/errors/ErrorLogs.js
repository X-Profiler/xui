"use strict";

import moment from "moment";
import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations, mapActions } = utils.createNamespace("dashboard/instance/errors");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
    const query = this.$route.query;
    if (query.page) {
      this.currentPage = Number(query.page);
    } else {
      this.currentPage = 1;
    }
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
    this.set_logs_load_error(undefined);
  },

  methods: {
    ...mapMutations(["set_logs_load_error"]),

    ...mapActions(["getErrorLogs"]),

    changeLogPage(page) {
      this.currentPage = page;
    }
  },

  computed: {
    ...mapState(["logs_loading", "logs_load_error", "logs_data"]),

    errors() {
      const { list, count } = this.logs_data;
      if (!Array.isArray(list)) {
        return [];
      }

      if (utils.isNumber(count)) {
        this.totaLogCount = count;
      }

      return list.map(log => {
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

  watch: {
    $route(...args) {
      utils.watchRoute.call(this, args, "page", "currentPage");
    },

    currentPage(...args) {
      if (!this.currentPage) {
        return;
      }

      this.getErrorLogs({
        cancelToken: this.cancelToken.token,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      utils.watchQueryKey.call(this, "page", "currentPage", args);
    }
  }
};