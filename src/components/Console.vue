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
        2020 &copy; Powered by
        <a
          href="https://github.com/hyj1991/easy-monitor"
          target="_blank"
        >Easy-Monitor</a> V3.0
      </Footer>
    </Layout>

    <!-- modal -->
    <x-modal
      ref="consoleModal"
      :title="newAppCreationTag"
      :okText="submitTag"
      :okLoadingText="submittingTag"
      :cancelText="closeTag"
      :loading="newAppCreationLoading"
      @canceled="()=>newAppName = ''"
      @submited="submitNewAppCreation"
    >
      <!-- content -->
      <template slot="content">
        <div class="modal-content modal-self">
          <Input v-model="newAppName" :placeholder="newAppNamePlaceholderTag">
            <span slot="prepend">{{ applicationNameTag }}</span>
          </Input>
          <p class="modal-attention">
            <strong>{{ newAppNameAttentionTag }}:</strong>
            <span style="margin-left: 10px;">{{ newAppNameAttentionDetailTag }}</span>
          </p>
        </div>
      </template>
    </x-modal>
  </div>
</template>

<script>
import xModal from "./common/Modal";
import xHeader from "./layout/Header";
import xApps from "./Apps";
import consoleModule from "../javascripts/Console";

const consoleData = Object.assign(
  {
    data() {
      return {
        selectedType: undefined,
        newAppName: "",
        newAppCreationLoading: false,
        nessaryQueryArgs: ["type"]
      };
    },
    components: {
      "x-modal": xModal,
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
  height: 69px;
  top: calc(100vh - 69px);
  width: 100%;
}

.modal-self {
  padding-top: 8px;
  user-select: none;
}

.modal-attention {
  /* position: absolute; */
  margin-top: -30px;
}
</style>