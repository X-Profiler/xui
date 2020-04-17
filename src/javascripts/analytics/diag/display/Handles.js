"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState } = utils.createNamespace("dashboard/analytics");
const { mapState: mapStateDiag } = utils.createNamespace("dashboard/analytics/diag");

export default {
  created() {
    const query = this.$route.query;
    if (query.uvPage) {
      this.currentPage = Number(query.uvPage);
    } else {
      this.currentPage = 1;
    }
  },

  methods: {
    changeHandlePage(page) {
      this.currentPage = null;
      setTimeout(() => this.currentPage = page, 0);
    }
  },

  computed: {
    ...mapState(["file_data"]),

    ...mapStateDiag(["uvType"]),

    handles() {
      const { libuvHandles } = this.file_data;

      const handles = [];
      for (const handle of libuvHandles) {
        if (handle.type === this.uvType) {
          handles.push(handle);
        }
      }

      handles.sort((o, n) => {
        if (!o.isActive && n.isActive) {
          return 1;
        } else if (o.isActive === n.isActive && !o.hasRef && n.hasRef) {
          return 1;
        } else {
          return -1;
        }
      });

      return handles.map(handle => {
        return {
          pcAddress: handle.address,
          isActive: handle.isActive,
          hasRef: handle.hasRef,
          handleDetail: handle.detail || "<empty>"
        };
      });
    },

    showHandles() {
      if (this.currentPage === null) {
        return [];
      }

      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.pageSize * this.currentPage;

      return this.handles.filter((...args) => {
        const [, index] = args;
        return index >= start && index < end;
      });
    }
  },

  watch: {
    $route(...args) {
      setTimeout(() => utils.watchRoute.call(this, args, "uvPage", "currentPage", true), 0);
    },

    currentPage(...args) {
      if (!this.currentPage) {
        return;
      }

      utils.watchQueryKey.call(this, "uvPage", "currentPage", args);
    }
  }
};