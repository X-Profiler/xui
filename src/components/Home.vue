<template>
  <div>
    <!-- header -->
    <x-header active="console" color="#0f1423" :owner="true"></x-header>

    <div class="home-body"></div>
  </div>
</template>

<script>
import xHeader from "@/components/layout/Header";

export default {
  components: {
    "x-header": xHeader
  }
};
</script>


<style scoped>
.home-body {
  background-color: #0f1423;
  height: calc(100vh - 50px);
  width: 100vw;
}
</style>