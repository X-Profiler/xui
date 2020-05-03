"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapMutations, mapActions } = utils.createNamespace("dashboard/settings");

export default {
  created() {
    this.cancelToken = utils.createCancelToken();
  },

  beforeDestroy() {
    utils.cancelRequest(this.cancelToken);
  },

  methods: {
    ...mapMutations(["setDeleteModal"]),

    ...mapActions(["deleteApp"]),

    closeDeleteModal() {
      this.setDeleteModal({ status: false });
    },

    submitAppDeletion() {
      this.loading = true;
      this
        .deleteApp({ cancelToken: this.cancelToken.token })
        .then(() => {
          this.setDeleteModal({ status: false });
          this.$router.push({ path: "/console", query: { type: "myApps" } });
        })
        .catch(err => {
          this.error = err.message;
          this.loading = false;
        });
    }
  }
};