"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/alarm");
const { mapState: mapStateHistory, mapActions: mapActionsHistory } = utils.createNamespace("dashboard/alarm/history");

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
  },

  methods: {
    ...mapActionsHistory(["getAlarmHistory"]),

    refreshAlarmHistory() {
      const { strategyId } = this.historyData;
      this.getAlarmHistory({
        cancelToken: this.cancelToken.token,
        data: {
          strategyId,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      });
    }
  },

  computed: {
    ...mapState(["historyData"]),

    ...mapStateHistory(["history_data"])
  },

  watch: {
    totaHistoryCount() {
      if (!this.totaHistoryCount) {
        return;
      }
      const maxPage = Math.ceil(this.totaHistoryCount / this.pageSize);
      if (this.currentPage > maxPage) {
        this.currentPage = maxPage;
      }
    },

    $route(...args) {
      utils.watchRoute.call(this, args, "page", "currentPage");
    },

    currentPage(...args) {
      if (!this.currentPage) {
        return;
      }

      this.refreshAlarmHistory();

      utils.watchQueryKey.call(this, "page", "currentPage", args);
    }
  }
};