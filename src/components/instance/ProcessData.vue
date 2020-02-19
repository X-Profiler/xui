<template>
  <div>Process Data: {{appId}}, {{ agentId }}</div>
</template>

<script>
export default {
  props: {
    appId: Number,
    agentId: String
  }
};
</script>