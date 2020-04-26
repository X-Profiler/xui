<template>
  <div class="panel">
    <!-- title -->
    <div class="title-group" :style="`background-color: ${getTitleColor(gcData.type)};`">
      <div class="icon-wrapper">
        <transition name="slide-noward">
          <Icon v-show="gcTime !== 1" class="icon" type="ios-arrow-back" @click="gcTime--" />
        </transition>
      </div>
      <div class="title-wrapper">
        <div class="mian-title">
          第
          <span class="gc-times">{{ gcTime }}</span> 次 GC
        </div>
        <div class="sub-title">类型: {{ gcData.type }}</div>
      </div>
      <div class="icon-wrapper">
        <transition name="slide-noward">
          <Icon
            v-show="gcTime !== maxDataLength"
            class="icon"
            type="ios-arrow-forward"
            @click="gcTime++"
          />
        </transition>
      </div>
    </div>

    <!-- statistics -->
    <div class="statistics">
      <div>
        <div
          v-for="(details, index) in statistics"
          :key="index"
          class="statistics-group"
          :style="index !== 0 ? 'margin-top: 10px;' : ''"
        >
          <div v-for="(detail, index) in details" :key="index" class="metric-group">
            <div class="metric-key">{{ detail.title }}</div>
            <div class="metric-value">{{ detail.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- space status -->
    <div class="gc-radio">
      <RadioGroup v-model="showSpaceStatus">
        <Radio label="before" class="radio-label">GC 前</Radio>
        <Radio label="after" class="radio-label">GC 后</Radio>
      </RadioGroup>
    </div>
  </div>
</template>

<script>
import xTracePanelModule from "@/javascripts/analytics/gc/TracePanel";

export default {
  props: {
    selectGc: Number
  },

  data() {
    return {
      gcTime: 1,
      showSpaceStatus: "before"
    };
  },

  ...xTracePanelModule
};
</script>

<style scoped>
.panel {
  background-color: #f9fafc;
}

.title-group {
  color: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  padding: 6px 0;
  transition: all 0.1s ease-out;
  display: flex;
  align-items: center;
  justify-content: space-around;
  user-select: none;
}

.icon-wrapper {
  flex: 0 0 50px;
}

.title-wrapper {
  flex-grow: 1;
}

.icon {
  cursor: pointer;
  transform: scale(2.3);
  flex-shrink: 0;
}

.mian-title {
  font-size: 20px;
}

.gc-times {
  font-size: 26px;
}

.sub-title {
  font-size: 12px;
}

.statistics {
  padding: 10px 0;
}

.statistics-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
}

.metric-group {
  flex: 1 0 50%;
}

.metric-key {
  font-size: 12px;
  color: #919597;
}

.metric-value {
  font-family: PingFangSC-Regular;
  font-weight: bold;
  margin-top: 2px;
}

.gc-radio {
  display: flex;
  justify-content: center;
  background-color: #e8eaec;
  padding: 5px 0;
}

.radio-label {
  font-size: 12px;
  font-family: Avenir,Helvetica,Arial,sans-serif;
}
</style>