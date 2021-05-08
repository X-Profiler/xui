<template>
  <div>
    <div
      v-for="(leak, index) in leakNodes"
      :key="index"
      :style="getIntervalStyle(index)"
    >
      <!-- card -->
      <div class="leak-card">
        <div class="detail">
          <div class="card-title">{{ getCardTitle(index) }}</div>
          <div class="card-content">
            <!-- single node -->
            <div v-if="leak.count === 1">
              实例 <strong>"{{ leak.name }}"</strong> 地址
              <strong>@{{ leak.address }}</strong> 占用了 V8 堆内
              <strong>{{ leak.formatedSize }} ({{ leak.percentage }}%)</strong>
              的空间.
            </div>

            <!-- muliti nodes -->
            <div v-else>
              <strong>{{ leak.count }}</strong> 个
              <strong>"{{ leak.name }}"</strong> 对象占用了 V8 堆内
              <strong>{{ leak.formatedSize }} ({{ leak.percentage }}%)</strong>
              的空间.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import suspectedModule from "@/javascripts/analytics/snapshot/display/Suspected";

export default {
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      leakNodes: [],
    };
  },

  ...suspectedModule,
};
</script>

<style scoped>
.leak-card {
  display: flex;
  background-color: #f8fafc;
  border-left: 9px solid #2376b7;
  padding: 10px 15px;
}

.card-title {
  font-family: PingFangSC-Regular, "Titillium Web", "Helvetica Neue", Helvetica,
    Arial, "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
  font-weight: bold;
  font-size: 16px;
}

.card-content {
  margin-top: 7px;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}
</style>
