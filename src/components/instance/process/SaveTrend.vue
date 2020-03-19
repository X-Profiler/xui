<template>
  <div>
    <div class="content">
      <x-loading :loading="loading" type="dot" size="middle"></x-loading>

      <x-error-message v-show="loadError" :message="loadError"></x-error-message>

      <div v-if="!loading && !loadError" class="results">
        <p>
          保存过去 24h 进程趋势数据成功，请访问
          <router-link class="link" :to="{path:`/app/${appId}/file`}" target="_blank">文件列表</router-link>查看详情。
        </p>
        <p style="margin-top: 5px;">文件名: {{ trendFile }}</p>
      </div>
    </div>

    <div class="modal-footer">
      <Button v-show="!loading" type="primary" ghost @click="closeSaveTrendModal">关闭</Button>
    </div>
  </div>
</template>

<script>
import saveTrendModule from "../../../javascripts/instance/process/SaveTrend";

const saveTrendData = Object.assign(
  {
    data() {
      return {
        loading: false,
        loadError: undefined,
        trendFile: undefined
      };
    }
  },
  saveTrendModule
);

export default saveTrendData;
</script>

<style scoped>
.content {
  text-align: center;
  padding: 26px 16px;
}

.results {
  text-align: left;
  display: inline-block;
}

.link {
  font-weight: bold;
  font-size: 15px;
}
</style>