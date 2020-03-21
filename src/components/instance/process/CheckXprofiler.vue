<template>
  <div>
    <x-modal
      ref="checkXprofiler"
      title="X-Profiler 插件状态"
      :width="530"
      @canceled="closeXprofilerCheck"
    >
      <template slot="content">
        <div class="container">
          <x-loading :loading="xprofiler_status_loading" type="dot" size="middle"></x-loading>
          <x-error-message
            v-show="xprofiler_status_load_error"
            :message="xprofiler_status_load_error"
          ></x-error-message>
          <transition name="slide-noward">
            <div v-show="!xprofiler_status_loading && !xprofiler_status_load_error" class="content">
              <!-- xprofiler status -->
              <div
                v-for="(check, index) in checkList"
                :key="index"
                class="xprofiler"
                :style="check.style"
              >
                <div v-html="index + 1 + '. ' + check.label"></div>
                <div
                  v-for="(child, index) in check.children"
                  :key="index"
                  class="xprofiler-status-group"
                  :style="index !== 0 ? 'margin-left: 15px' : ''"
                >
                  <div v-if="!child.dropdown" class="xprofiler-status">
                    <Icon :type="child.icon" :style="child.style" />
                    <div class="xprofiler-status-label">{{ child.label }}</div>
                  </div>

                  <div v-else class="dropdown">
                    <Icon :type="child.icon" :style="child.style" />
                    <x-dropdown :transformY="8">
                      <div
                        slot="title"
                        class="dropdown-title xprofiler-status-label"
                      >{{ child.label }}</div>

                      <div slot="content">
                        <div
                          v-for="(li, index) in child.children"
                          :key="index"
                          class="xprofiler-logdir-group x-dropdown-li"
                        >
                          <div class="dropdown-dot" :style="'background-color: ' + li.color + ';'"></div>
                          <div v-html="li.label"></div>
                        </div>
                      </div>
                    </x-dropdown>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </template>

      <template slot="footer">
        <div v-show="!xprofiler_status_loading">
          <Button type="primary" ghost @click="closeXprofilerCheck">关闭</Button>
        </div>
      </template>
    </x-modal>
  </div>
</template>

<script>
import checkXprofilerModule from "../../../javascripts/instance/process/CheckXprofiler";

export default {
  data() {
    return {
      modalQueryKey: "check-xprofiler",
      healthyColor: "#2a9446",
      wrongColor: "#e33900"
    };
  },

  ...checkXprofilerModule
};
</script>

<style scoped>
.container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}

.content {
  color: #373d41;
  text-align: left;
  font-family: "Titillium Web", "Helvetica Neue", Helvetica, Arial,
    "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}

.xprofiler {
  display: flex;
}

.xprofiler-status-group {
  display: flex;
}

.xprofiler-status {
  display: flex;
  align-items: center;
}

.xprofiler-status-label {
  font-size: 13px;
  margin-left: 4px;
}

.xprofiler-logdir {
  position: absolute;
  margin-left: 16px;
}

.xprofiler-logdir-group {
  font-size: 13px;
  padding: 5px 15px;
  white-space: nowrap;
}

.dropdown {
  display: flex;
  align-items: center;
}

.dropdown-title {
  padding-top: 1px;
}

.dropdown-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  margin-right: 7px;
}
</style>