<template>
  <div>
    <x-overview></x-overview>

    <x-detail-info class="detail"></x-detail-info>
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
  margin-top: 20px;
}
</style>