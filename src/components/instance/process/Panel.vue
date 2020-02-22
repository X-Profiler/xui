<template>
  <div>
    <!-- check running process -->
    <div style="text-align:right">
      <Button class="check-button" type="info" size="small">
        <Icon type="md-apps" class="check-button-icon" />查看运行中的 Node.js 进程
      </Button>
    </div>
  </div>
</template>

<script>
import panelModule from "../../../javascripts/instance/process/Panel";

const panelData = Object.assign(
  {
    props: {
      processes: Array
    }
  },
  panelModule
);

export default panelData;
</script>

<style scoped>
.check-button {
  font-size: 11px;
}

.check-button-icon {
  margin-right: 5px;
}
</style>