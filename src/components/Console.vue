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
        <Tabs>
          <TabPane :label="myApps">
            <x-app type="myApps"></x-app>
          </TabPane>
          <TabPane :label="joinedApps">
            <x-app type="joinedApps"></x-app>
          </TabPane>
        </Tabs>
      </Content>

      <!-- footer -->
      <Footer class="footer">
        2020 &copy; Powered by
        <a
          href="https://github.com/hyj1991/easy-monitor"
          target="_blank"
        >Easy-Monitor</a> v3.0
      </Footer>
    </Layout>
  </div>
</template>

<script>
import xHeader from "./layout/Header";
import xApp from "./App";
import consoleModule from "../javascripts/Console";

const consoleData = Object.assign(
  {
    data() {
      return {};
    },
    components: {
      "x-header": xHeader,
      "x-app": xApp
    }
  },
  consoleModule
);

export default consoleData;
</script>