<style scoped>
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
      <Content>// TODO: Dashboard Content</Content>

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

export default {
  data() {
    return {};
  },
  components: {
    "x-header": xHeader
  }
};
</script>