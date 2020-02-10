<template>
  <div>
    <Layout>
      <!-- header -->
      <x-header active="console"></x-header>

      <!-- body content -->
      <Content class="content">
        <!-- create new app -->
        <Button type="primary" ghost class="create-new-app">
          <Icon type="md-person-add" class="new-app-icon" />创建新应用
        </Button>

        <!-- tab -->
        <Tabs class="app-tab" v-model="selectedType">
          <TabPane :label="myApps" name="myApps"></TabPane>
          <TabPane :label="joinedApps" name="joinedApps"></TabPane>
        </Tabs>

        <!-- app list -->
        <x-apps :type="selectedType"></x-apps>
      </Content>

      <!-- footer -->
      <Footer class="footer">
        2020 &copy; Powered by
        <a
          href="https://github.com/hyj1991/easy-monitor"
          target="_blank"
        >Easy-Monitor</a> V3.0
      </Footer>
    </Layout>
  </div>
</template>

<script>
import xHeader from "./layout/Header";
import xApps from "./Apps";
import consoleModule from "../javascripts/Console";

const consoleData = Object.assign(
  {
    data() {
      return {
        selectedType: "myApps"
      };
    },
    components: {
      "x-header": xHeader,
      "x-apps": xApps
    }
  },
  consoleModule
);

export default consoleData;
</script>

<style scoped>
.content {
  margin: 10px 20px;
}

.create-new-app {
  position: absolute;
  right: 20px;
  z-index: 999;
}

.new-app-icon {
  margin-right: 6px;
  margin-top: 4px;
}

.app-tab {
  margin-top: 7px;
  user-select: none;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>