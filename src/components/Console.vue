<template>
  <div>
    <Layout>
      <!-- header -->
      <x-header active="console" :owner="selectedType === 'myApps'"></x-header>

      <!-- body content -->
      <Content class="content">
        <!-- create new app -->
        <transition name="slide-button">
          <div v-show="selectedType === 'myApps'" class="create-new-app">
            <Button type="primary" ghost @click="showNewAppCreation">
              <Icon type="md-person-add" class="new-app-icon" />
              {{ newAppCreationTag }}
            </Button>
          </div>
        </transition>

        <!-- tab -->
        <Tabs class="app-tab" v-model="selectedType">
          <TabPane :label="myApps" name="myApps"></TabPane>
          <TabPane :label="joinedApps" name="joinedApps"></TabPane>
        </Tabs>

        <!-- app list -->
        <x-apps ref="appList" :type="selectedType"></x-apps>
      </Content>

      <!-- footer -->
      <Footer class="footer">
        2020 &copy;
        <a href="https://github.com/hyj1991/easy-monitor" target="_blank">Easy-Monitor</a> 3.0 Powered by
        <a href="https://eggjs.org/" target="_blank">
          <x-egg-logo class="egg-logo"></x-egg-logo>
        </a>
      </Footer>
    </Layout>

    <!-- create new app -->
    <x-modal
      ref="newApp"
      :title="newAppCreationTag"
      :padding="0"
      hide-footer
      @canceled="closeNewAppModal"
    >
      <x-create-app slot="content" @refresh="refreshApps"></x-create-app>
    </x-modal>
  </div>
</template>

<script>
import xHeader from "./layout/Header";
import xApps from "./Apps";
import xEggLogo from "./logo/Egg";
import xCreateApp from "./CreateApp";
import consoleModule from "../javascripts/Console";

export default {
  components: {
    "x-header": xHeader,
    "x-apps": xApps,
    "x-egg-logo": xEggLogo,
    "x-create-app": xCreateApp
  },

  data() {
    return {
      selectedType: undefined,
      valueWhiteList: { selectedType: ["myApps", "joinedApps"] },
      nessaryQueryArgs: ["type"],
      modalQueryKey: "new-app"
    };
  },

  ...consoleModule
};
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
  height: 69px;
  top: calc(100vh - 69px);
  width: 100%;
}

.egg-logo {
  position: absolute;
  top: 25px;
  left: calc(50% + 122px);
}
</style>