<template>
  <div>
    <!-- tooltip -->
    <x-tooltip :min-width="100" ref="tooltip">
      <div slot="content" class="tooltip-content">{{ selectedData.name }}: {{ selectedData.size }}</div>
    </x-tooltip>

    <div ref="heapGroup" class="heap-group">
      <div class="heap-item">
        <div class="sub-title">已使用 / 已分配堆内存 ({{ heapData.usedTotalPect }})</div>
        <div
          class="heap-used-wrapper"
          @mousemove="mousemove('heap_total', heapData.heapTotal, $event)"
          @mouseleave="mouseleave"
        >
          <div
            class="heap-used"
            @mousemove.stop="mousemove('heap_used', heapData.heapTotalUsed, $event)"
            :style="heapData.usedTotalStyle"
          ></div>
        </div>
      </div>

      <div class="heap-item">
        <div class="sub-title">已使用 / 堆内存上限 ({{ heapData.usedLimtPect }})</div>
        <div
          class="heap-used-wrapper"
          @mousemove="mousemove('heap_limit', heapData.heapLimit, $event)"
          @mouseleave="mouseleave"
        >
          <div
            class="heap-used"
            @mousemove.stop="mousemove('heap_used', heapData.heapTotalUsed, $event)"
            :style="heapData.usedLimitStyle"
          ></div>
        </div>
      </div>

      <div class="heap-item">
        <div class="sub-title">堆内存分布</div>
        <div class="heap-used-wrapper">
          <div class="heap-spaces">
            <div
              v-for="(space, index) in heapSpaces"
              :key="index"
              :style="space.width + 'height: 100%;' + (index !== 0 && space.rawWidth !== 0 ? 'padding-left: 1px;': '')"
              @mousemove.stop="mousemove(space.name, space.size, $event)"
              @mouseleave="mouseleave"
            >
              <div class="heap-used" :style="space.color"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import heapModule from "@/javascripts/analytics/diag/display/Heap";

export default {
  data() {
    return {
      selectedData: {},
      heapGroupWidth: Infinity
    };
  },

  ...heapModule
};
</script>>

<style scoped>
.heap-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.heap-item {
  text-align: center;
  flex: 1 0 300px;
}

.sub-title {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.heap-used-wrapper {
  height: 25px;
  background-color: #eff1f4;
  width: 60%;
  display: inline-block;
  margin-top: 10px;
  cursor: pointer;
  box-shadow: 2px 2px 6px rgba(132, 132, 132, 0.25) inset;
}

.heap-used {
  height: 100%;
  background-color: #884ea0;
  transition: all 0.5s ease-out;
}

.heap-spaces {
  display: flex;
  justify-content: center;
  height: 100%;
}

.heap-used:hover {
  opacity: 0.85;
  /* transform: scale(1.1); */
  transition: all 0.1s ease;
}

.tooltip-content {
  padding: 3px 10px;
  font-size: 13px;
  color: #515a6e;
}
</style>