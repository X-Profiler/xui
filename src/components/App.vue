<style scoped>
.app {
  text-align: left;
  height: 150px;
  margin-bottom: 20px;
  background-color: #fafbfd;
  display: flex;
  flex-basis: 7px;
}

.app-border {
  height: 100%;
  flex-basis: 7px;
  background-image: url("/images/bg1.jpg");
  background-blend-mode: multiply;
}

.app-content {
  height: 100%;
  flex-grow: 1;
}

.app-content-title {
  height: 100%;
}

.app-content-title-name {
  font-size: 20px;
  padding: 10px 15px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #fff;
  background-image: url("/images/bg1.jpg");
  background-blend-mode: multiply;
}

.app-content-select {
  cursor: pointer;
}

.app-content-title-metric {
  display: flex;
  font-size: 10px;
  text-align: center;
}

.app-content-title-metric-key {
  margin: 5px 10px;
  /* font-weight: bold; */
}

.app-content-title-metric-value {
  margin: 5px 10px;
  font-weight: bold;
}

.app-content-metrics {
  height: 100%;
  padding-top: 15px;
}

.app-content-metric {
  width: 33.3%;
  padding: 0 10px;
  text-align: center;
}

.instances {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 6px;
}

.instance-ico {
  font-size: 18px;
}
</style>

<template>
  <div>
    <div v-if="appLoading" class="spin-loading" style="margin-top:200px;">
      <Spin size="large"></Spin>
    </div>
    <div v-else>
      <!-- app overview -->
      <div
        v-for="(app, index) in apps"
        :key="index"
        class="app"
        :style="index === apps.length - 1 ? 'margin-bottom: 80px':''"
      >
        <!-- app border -->
        <div class="app-border" :style="'background-color: ' + randomColor(index)"></div>

        <!-- app content -->
        <Row class="app-content">
          <!-- title -->
          <!-- :style="'border-right: 1px solid ' + randomColor(index) + ';border-bottom: 1px solid ' + randomColor(index)" -->
          <Col span="6" class="app-content-title">
            <div class="app-content-title-name" :style="'background-color: ' + randomColor(index)">
              <p>xprofiler</p>
              <div style="display: flex">
                <div class="app-content-select">
                  <p style="font-size: 10px">实例</p>
                  <Icon type="md-albums" />
                </div>

                <div class="app-content-select" style="margin-left: 10px;">
                  <p style="font-size: 10px">文件</p>
                  <Icon type="ios-folder" />
                </div>

                <div class="app-content-select" style="margin-left: 10px;">
                  <p style="font-size: 10px">团队</p>
                  <Icon type="md-people" />
                </div>

                <div class="app-content-select" style="margin-left: 10px;">
                  <p style="font-size: 10px">报警</p>
                  <Icon type="ios-alarm" />
                </div>

                <div class="app-content-select" style="margin-left: 10px;">
                  <p style="font-size: 10px">设置</p>
                  <Icon type="md-settings" />
                </div>
              </div>
            </div>
            <div class="app-content-title-metric">
              <div>
                <p class="app-content-title-metric-key">实例个数</p>
                <p class="app-content-title-metric-value app-content-select">0</p>
              </div>
              <div>
                <p class="app-content-title-metric-key">24h 告警数</p>
                <p class="app-content-title-metric-value app-content-select">0</p>
              </div>
              <div>
                <p class="app-content-title-metric-key">依赖风险数</p>
                <p class="app-content-title-metric-value app-content-select">0</p>
              </div>
            </div>
          </Col>

          <!-- metrics -->
          <Col span="18" class="app-content-metrics">
            <div style="display: flex;">
              <!-- node process cpu -->
              <div class="app-content-metric">
                <p>Node.js 进程 CPU 负载</p>
                <div class="instances">
                  <Icon class="instance-ico" type="md-egg" />
                </div>
              </div>

              <!-- node process memory -->
              <div class="app-content-metric">
                <p>Node.js 进程 Memory 负载</p>
                <div class="instances">
                  <Icon class="instance-ico" type="md-egg" />
                </div>
              </div>

              <!-- node process memory -->
              <div class="app-content-metric">
                <p>系统磁盘状态</p>
                <div class="instances">
                  <Icon class="instance-ico" type="md-egg" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import appModule from "../javascripts/App";

const appData = Object.assign(
  {
    props: {
      type: String
    },
    data() {
      return {
        colors: [
          "#2d8cf0",
          "#2db7f5",
          "#19be6b",
          "#5cadff",
          "#ff9900",
          "#2b85e4",
          "#ed4014",
          "#c5c8ce"
        ],
        appLoading: false,
        apps: [{}, {}, {}, {}, {}, {}, {}, {}]
      };
    }
  },
  appModule
);

export default appData;
</script>