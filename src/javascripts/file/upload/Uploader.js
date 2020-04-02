"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapMutations } = utils.createNamespace("dashboard/file");
const { mapMethods, mapWatch, handleMounted } =
  utils.modalRouteFactory("modalQueryKey", "uploadModal", "uploadFile", "setUploadModal");

export default {
  mounted() {
    handleMounted.call(this, "handleUploadModal", true);
  },

  methods: {
    ...mapMutations(["setUploadModal"]),

    ...mapMethods(["handleUploadModal"]),

    openUploadModal() {
      this.setUploadModal({ status: true });
    },

    closeUploadModal() {
      this.setUploadModal({ status: false });
    }
  },

  computed: {
    ...mapState(["uploadModal"])
  },

  watch: {
    ...mapWatch,

    $route(to) {
      this.handleUploadModal(to.query);
    }
  }
};