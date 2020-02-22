<template>
  <div>panel</div>
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