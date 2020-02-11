<template>
  <div>
    <Layout>
      <!-- header -->
      <x-header active="console"></x-header>

      <!-- body content -->
      <Content class="content">
        <!-- create new app -->
        <Button type="primary" ghost class="create-new-app" @click="showNewAppCreation">
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

    <!-- modal -->
    <x-modal
      ref="consoleModal"
      title="创建新应用"
      okText="提交"
      okLoadingText="提交中..."
      cancelText="关闭"
      :loading="newAppCreationLoading"
      @canceled="()=>newAppName = ''"
      @submited="submitNewAppCreation"
    >
      <!-- content -->
      <template slot="content">
        <div class="modal-content modal-self">
          <Input v-model="newAppName" placeholder="请输入您的应用名称">
            <span slot="prepend">应用名称</span>
          </Input>
          <p class="modal-attention">
            <strong>注意:</strong>
            <span style="margin-left: 10px;">应用名称最大长度不能超过 30 个字符</span>
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
        selectedType: "myApps",
        newAppName: "",
        newAppCreationLoading: false
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
  bottom: 0;
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