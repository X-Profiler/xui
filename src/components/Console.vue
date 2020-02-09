<style scoped>
.content {
  margin: 10px 20px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>

<template>
  <div>
    <Layout>
      <!-- header -->
      <x-header active="console"></x-header>

      <!-- body content -->
      <Content class="content">

        <!-- tab -->
        <Tabs v-model="selectedType">
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