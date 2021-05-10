<template>
  <div>
    <!-- seach button -->
    <div class="search">
      <Input
        v-model="addressOrId"
        placeholder="Enter object address | ID"
        style="width: 200px"
        @on-focus="clearInput"
      />
      <Button class="search-button" type="primary" @click="searchAddressOrId"
        >搜索</Button
      >
    </div>

    <!-- edge -->
    <div class="edge">
      <div class="section-title">Edge 视图</div>
      <x-containment :profile="profile" :rootId="rootId"></x-containment>
    </div>

    <!-- retainer -->
    <div class="retainer">
      <div class="section-title">Retainer 视图</div>
      <x-retainer :profile="profile" :rootId="rootId"></x-retainer>
    </div>
  </div>
</template>

<script>
import searchModule from "@/javascripts/analytics/snapshot/display/Search";
import xContainment from "@/components/analytics/snapshot/display/Containment";
import xRetainer from "@/components/analytics/snapshot/display/Retainer";

export default {
  props: {
    profile: {
      type: Object,
      default: () => ({}),
    },
  },

  components: {
    "x-containment": xContainment,
    "x-retainer": xRetainer,
  },

  data() {
    return {
      addressOrId: null,
      rootId: -1,
    };
  },

  ...searchModule,
};
</script>

<style scoped>
.search {
  display: flex;
}

.search-button {
  margin-left: 10px;
}

.edge {
  margin-top: 15px;
}

.retainer {
  margin-top: 15px;
}
</style>
