<template>
  <div>
    <x-modal ref="checkAgent" title="查看实例" :width="560" @canceled="closeAgentCheck">
      <template slot="content">
        <div style="text-align: center">
          <x-loading :loading="agent_loading" type="dot" size="middle"></x-loading>
          <x-error-message v-show="agent_load_error" :message="agent_load_error"></x-error-message>
          <transition name="slide-noward">
            <x-table
              v-show="!agent_loading && !agent_load_error"
              :columns="checkAgentColumns"
              :data="agent_data"
              noDataText="没有获取到实例信息"
            ></x-table>
          </transition>
        </div>
      </template>

      <template slot="footer">
        <div v-show="!agent_loading">
          <Button type="primary" ghost @click="closeAgentCheck">关闭</Button>
        </div>
      </template>
    </x-modal>
  </div>
</template>

<script>
import checkAgentModule from "../../javascripts/instance/CheckAgent";

const checkAgentData = Object.assign(
  {
    data() {
      return {
        checkAgentColumns: [
          { title: "类型", value: "type", width: "130" },
          { title: "信息详情", value: "value" }
        ]
      };
    }
  },
  checkAgentModule
);

export default checkAgentData;
</script>