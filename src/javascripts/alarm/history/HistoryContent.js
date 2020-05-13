"use strict";

import moment from "moment";
import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters } = utils.createNamespace("dashboard/alarm");
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

    formatTime(time) {
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },

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
    },

    changeHistoryPage(page) {
      this.currentPage = page;
    }
  },

  computed: {
    ...mapState(["historyData"]),

    ...mapGetters(["formatContextType"]),

    ...mapStateHistory(["history_data"])
  },

  watch: {
    history_data() {
      const { list, count } = this.history_data;
      if (!Array.isArray(list)) {
        return;
      }
      if (utils.isNumber(count)) {
        this.totaHistoryCount = count;
        this.$emit("historyCount", count);
      }
      this.history = list.map(item => {
        const data = Object.assign({}, item);
        return data;
      });
    },

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