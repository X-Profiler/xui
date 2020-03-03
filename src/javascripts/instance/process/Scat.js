export default {
  methods: {
    selectPid(index) {
      this.$emit("selectPid", index);
    },

    setScatterData(item) {
      item.HEAP = Number(item.heapUsage);
      item.CPU = Number(item.cpuUsage);
      item.GC = Number(item.gcUsage);
      item.RSS = Number((item.rss / 1024 / 1024).toFixed(2));
    }
  }
};