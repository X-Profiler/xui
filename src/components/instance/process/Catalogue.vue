<template>
  <div class="catalogue">
    <div style="position: relative" v-for="(catg, index) in catalogues" :key="index">
      <div class="tag dropdown-list">
        <x-dropdown class="panel-title-dropdown" :title="catg.label"></x-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import xDropdown from "../../common/Dropdown";
import catalogueModule from "../../../javascripts/instance/process/Catalogue";

const catalogueData = Object.assign(
  {
    components: {
      "x-dropdown": xDropdown
    },
    data() {
      return {
        catalogues: [
          { label: "CPU", value: "cpu" },
          { label: "堆内存", value: "heapMemory" },
          { label: "GC", value: "gc" },
          { label: "物理内存 (RSS)", value: "rss" },
          { label: "定时器数量", value: "timer" },
          { label: "TCP 连接数", value: "tcp" },
          { label: "UDP 连接数", value: "tcp" }
        ]
      };
    }
  },
  catalogueModule
);

export default catalogueData;
</script>

<style scoped>
.catalogue {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
  /* justify-content: space-between; */
}

.tag {
  height: 26px;
  font-size: 13px;
  padding: 3px 7px 2px 19px;
  background-color: rgb(42, 125, 194);
  color: white;
  border-radius: 4px;
  border-top-left-radius: 26px;
  border-bottom-left-radius: 26px;
  margin-right: 40px;
  margin-top: 6px;
  user-select: none;
}

.tag::before {
  content: "";
  position: absolute;
  top: 16px;
  left: 7px;
  width: 6px;
  height: 6px;
  background-color: #fff;
  border-radius: 50%;
}
</style>