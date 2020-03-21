<template>
  <div>
    <div class="x-modal-content">
      <x-loading :loading="save_trend_loading" type="dot" size="middle"></x-loading>

      <x-error-message v-show="save_trend_load_error" :message="save_trend_load_error"></x-error-message>

      <div v-if="!save_trend_loading && !save_trend_load_error" class="x-modal-results">
        <p>
          保存过去 24h 进程趋势数据成功，请访问
          <router-link class="x-modal-link" :to="{path:`/app/${appId}/file`}" target="_blank">文件列表</router-link>查看详情。
        </p>
        <p style="margin-top: 8px;">文件名: {{ save_trend_data }}</p>
      </div>
    </div>

    <div class="x-modal-footer">
      <Button v-show="!save_trend_loading" type="primary" ghost @click="closeSaveTrendModal">关闭</Button>
    </div>
  </div>
</template>

<script>
import saveTrendModule from "../../../javascripts/instance/process/SaveTrend";

export default {
  ...saveTrendModule
};
</script>