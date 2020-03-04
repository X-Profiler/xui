<template>
  <div class="catalogue">
    <div style="position: relative" v-for="(catg, index) in catalogues" :key="index">
      <div class="tag">
        <x-dropdown style="padding-left: 17px;" :title="catg.label" position="left">
          <template slot="content">
            <div
              v-for="(proc, index) in sort(catg.value)"
              :class="'x-dropdown-li' + (proc.pid === processData.pid ? ' selected':'')"
              :key="index"
              @click="selectPid(proc)"
            >
              <div class="catalogue-dropdown-dot" :style="'background-color: '+ proc.color"></div>
              <div class="catalogue-dropdown-pid">{{ proc.pid }}:</div>
              <div class="catalogue-dropdown-fmt">{{ proc[catg.fmt] }}</div>
              <!-- <div class="catalogue-dropdown-cmd" :title="proc.cmd">{{ proc.cmd }}</div> -->
            </div>
          </template>
        </x-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import catalogueModule from "../../../javascripts/instance/process/Catalogue";

const catalogueData = Object.assign(
  {
    props: {
      processes: Array
    },
    data() {
      return {
        processData: {},
        catalogues: [
          { label: "CPU", value: "cpu", fmt: "cpuUsageFmt" },
          { label: "堆内存", value: "heapMemory", fmt: "heapUsageFmt" },
          { label: "物理内存 (RSS)", value: "rss", fmt: "rssFmt" },
          { label: "GC", value: "gc", fmt: "gcUsageFmt" },
          { label: "定时器数量", value: "timer", fmt: "timers" },
          { label: "TCP 连接数", value: "tcp", fmt: "tcpHandles" },
          { label: "UDP 连接数", value: "udp", fmt: "udpHandles" }
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
  padding-bottom: 12px;
  /* justify-content: space-between; */
}

.tag {
  height: 25px;
  font-size: 13px;
  padding: 3px 7px 2px 3px;
  background-color: rgb(42, 125, 194);
  color: white;
  border-radius: 4px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  margin-right: 40px;
  margin-top: 7px;
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

.catalogue-dropdown-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.catalogue-dropdown-pid {
  margin-left: 12px;
  font-weight: bold;
  width: 60px;
}

.catalogue-dropdown-fmt {
  /* font-weight: bold; */
  width: 80px;
}

.catalogue-dropdown-cmd {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>