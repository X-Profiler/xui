<template>
  <div>
    <!-- header -->
    <x-header active="console"></x-header>

    <div class="x-body">
      <!-- sider -->
      <x-sider :active="menuTab" @menuChanged="menuChanged"></x-sider>

      <Content>Content</Content>
    </div>
  </div>
</template>

<script>
import xHeader from "./layout/Header";
import xSider from "./layout/Sider";
export default {
  components: {
    "x-header": xHeader,
    "x-sider": xSider
  },

  data() {
    return {
      appId: null,
      menuTab: null
    };
  },

  created() {
    this.appId = this.$route.params.appId;
    this.menuTab = this.$route.params.menuTab;
  },

  methods: {
    menuChanged(active) {
      this.menuTab = active;
      if (this.$route.params.menuTab !== active) {
        this.$router.push({ path: active });
      }
    }
  }
};
</script>