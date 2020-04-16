<template>
  <div>
    <div v-if="file_data.libuvHandles.length">
      <Alert class="x-alert" type="info">
        <div class="alert-group">
          <Icon style="color: #2376b7;`" type="ios-alert-outline" />
          <div class="alert-desc">
            Libuv 总句柄数:
            <span class="statistics-number">{{ statistics.total }}</span>,
            活跃总句柄数:
            <span class="statistics-number">{{ statistics.active }}</span>,
            活跃且存在引用总句柄数:
            <span class="statistics-number">{{ statistics.activeAndRef }}</span>
          </div>
        </div>
      </Alert>

      <div class="uv-handle">
        <Select v-model="selectedUvType" class="agent-selector uv-type-selector">
          <Option v-for="(item, index) in uvTypes" :key="index" :value="item.value">{{ item.value }}</Option>
        </Select>
        <div class="handle-tags">
          <Tag
            v-for="(tag, index) in uvTags"
            :key="index"
            class="handle-tag"
            type="dot"
            :color="tag.color"
            :style="index !==0 ? 'margin-left: 20px;' : ''"
          >
            <code>
              {{ tag.label }}:
              <span class="statistics-number">{{ handleStatistics[tag.value] }}</span>
            </code>
          </Tag>
        </div>
      </div>
    </div>

    <div v-else>
      <x-error-message message="暂无 Libuv 句柄信息" top="calc(35vh - 150px)"></x-error-message>
    </div>
  </div>
</template>

<script>
import libuvModule from "../../../../javascripts/analytics/diag/display/Libuv";

export default {
  data() {
    return {
      selectedUvType: undefined,
      uvTags: [
        { label: "句柄总数", value: "total", color: "primary" },
        { label: "活跃句柄总数", value: "active", color: "success" },
        {
          label: "活跃且存在引用句柄总数",
          value: "activeAndRef",
          color: "warning"
        }
      ],
      nessaryQueryArgs: [
        "filterType",
        "page",
        "diag-analytics",
        "diagTab",
        "diagData"
      ]
    };
  },

  ...libuvModule
};
</script>

<style scoped>
.uv-type-selector {
  margin-top: 5px;
  width: 116px;
}

.statistics-number {
  color: #c45a65;
}

.uv-handle {
  display: flex;
  align-items: center;
  position: relative;
}

.handle-tags {
  /* margin-left: 30px; */
  position: absolute;
  right: 0;
}

.handle-tag {
  margin: 5px 0 0 0;
}
</style>