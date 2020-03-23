<template>
  <div>
    <x-overview></x-overview>

    <div class="detail">
      <x-detail-info></x-detail-info>
    </div>
  </div>
</template>

<script>
import systemModule from "@/javascripts/instance/system/SystemIndex";
import overview from "@/components/instance/system/Overview";
import detailInfo from "@/components/instance/system/DetailInfo";

export default {
  components: {
    "x-overview": overview,
    "x-detail-info": detailInfo
  },

  ...systemModule
};
</script>

<style scoped>
.detail {
  margin-top: 15px;
}
</style>