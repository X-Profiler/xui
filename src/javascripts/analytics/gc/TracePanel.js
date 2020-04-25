"use strict";

import * as utils from "@/javascripts/lib/utils";

const { mapState, mapGetters } = utils.createNamespace("dashboard/analytics/gc");

export default {
  methods: {
    getTitleColor(type) {
      let color = "";
      switch (type) {
        case "scavenge":
          color = "#3498db";
          break;
        case "marksweep":
          color = "#ff9900";
          break;
        case "marking":
          color = "#6a5acd";
          break;
        default:
          break;
      }
      return color;
    }
  },

  computed: {
    ...mapState(["gcFile"]),

    ...mapGetters(["calculateSize"]),

    gcData() {
      return this.gcFile.gc[this.gcTime - 1];
    },

    maxDataLength() {
      return this.gcFile.gc.length;
    }
  },

  watch: {
    selectGc() {
      if (utils.isNumber(this.selectGc)) {
        this.gcTime = this.selectGc;
      }
    }
  }
};