<template>
  <div>
    <!-- header -->
    <x-header active="console"></x-header>

    <div class="x-body">
      <!-- sider -->
      <x-sider></x-sider>

      <Content>Content</Content>
    </div>
  </div>
</template>

<script>
import xHeader from "../layout/Header";
import xSider from "../layout/Sider";
export default {
  components: {
    "x-header": xHeader,
    "x-sider": xSider
  }
};
</script>