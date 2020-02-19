<template>
  <div class="content">
    <!-- process panel -->
    <div class="panel"></div>

    <!-- process data -->
    <div class="data"></div>
  </div>
</template>

<script>
import processModule from "../../javascripts/instance/ProcessData";

const processData = Object.assign(
  {
    props: {
      appId: Number,
      agentId: String
    }
  },
  processModule
);

export default processData;
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row-reverse;
}

.panel {
  width: 200px;
  background-color: blue;
}

.data {
  flex-grow: 1;
  background-color: gray;
}
</style>