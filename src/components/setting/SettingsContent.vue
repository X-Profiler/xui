<template>
  <div class="content">
    <!-- settings info -->
    <div
      class="wrapper"
      v-for="(setting, index) in settings"
      :key="index"
      :style="index !== 0 ? 'margin-top: 15px;' : ''"
    >
      <div class="item-label">{{ setting.label }}:</div>
      <div class="item-value">{{ settings_data[setting.value] }}</div>
    </div>

    <!-- operations -->
    <div class="wrapper operations">
      <div class="item-label"></div>
      <div class="item-value">
        <Button type="info" size="small" class="button" @click="openNameModifyModal">修改名称</Button>
        <Button
          type="error"
          size="small"
          class="button"
          style="margin-left: 11px"
          @click="openDeleteAppModal"
        >删除应用</Button>
      </div>
    </div>
  </div>
</template>

<script>
import settingsContentModule from "@/javascripts/setting/SettingsContent";

export default {
  data() {
    return {
      settings: [
        { label: "应用名称", value: "name" },
        { label: "应用 ID", value: "appId" },
        { label: "应用秘钥", value: "secret" }
      ]
    };
  },

  ...settingsContentModule
};
</script>

<style scoped>
.content {
  margin-top: 80px;
}

.wrapper {
  display: flex;
}

.item-label {
  width: calc(50% - 50px);
  flex-shrink: 0;
  text-align: right;
  padding-right: 6px;
  font-weight: bold;
}

.item-value {
  width: calc(50% + 50px);
  flex-shrink: 0;
  text-align: left;
  padding-left: 6px;
}

.operations {
  margin-top: 15px;
}

.button {
  font-size: 13px;
}
</style>